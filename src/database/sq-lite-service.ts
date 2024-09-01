import SQLite from 'react-native-sqlite-storage';

export interface Author {
  username: string;
  email: string;
  user_id: number;
}

export interface CommentData {
  id: number;
  content: string;
  timestamp: string;
  parent_id?: number;
  author: Author;
  repliesCount: number;
}

export interface GetCommentsResponse {
  comments: CommentData[];
  totalCount: number;
}

export interface GetRepliesResponse {
  replies: CommentData[];
}

export enum UserStatus {
  REGISTERED = 'REGISTERED',
  NEW_USER = 'NEW USER',
}

const database_name = 'comments.db';

// SQLite.DEBUG(true);
SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase | null = null;

export const openDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabase({
      name: database_name,
      location: 'default',
    });
  }
  return db;
};

export const initDatabase = async () => {
  const db = await openDatabase();

  await db.executeSql(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL
      );
    `);

  await db.executeSql(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        parent_id INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (parent_id) REFERENCES comments(id)
      );
    `);
};

export const addUser = async (email: string, username: string) => {
  const db = await openDatabase();

  try {
    const results = await db.executeSql(
      'SELECT * FROM users WHERE email = ? OR username = ?;',
      [email, username],
    );

    let status: UserStatus;
    let user;

    if (results[0].rows.length > 0) {
      user = results[0].rows.item(0);
      status = UserStatus.REGISTERED;
    } else {
      const insertResult = await db.executeSql(
        'INSERT INTO users (email, username) VALUES (?, ?);',
        [email, username],
      );

      user = {
        id: insertResult[0].insertId,
        email,
        username,
      };
      status = UserStatus.NEW_USER;
    }

    return {
      ...user,
      status,
    };
  } catch (error) {
    console.error('ADD USER DB ERROR ', error);
    throw error;
  }
};

export const addComment = async (
  userId: number,
  content: string,
  parentId: number | null = null,
) => {
  const db = await openDatabase();
  return db.executeSql(
    'INSERT INTO comments (user_id, content, parent_id) VALUES (?, ?, ?);',
    [userId, content, parentId],
  );
};

export const getTopLevelComments = async (
  offset: number,
  limit: number,
): Promise<GetCommentsResponse> => {
  const db = await openDatabase();

  try {
    const totalCountResult = await db.executeSql(
      'SELECT COUNT(*) as totalCount FROM comments WHERE parent_id IS NULL;',
    );
    const totalCount = totalCountResult[0].rows.item(0).totalCount;

    const results = await db.executeSql(
      `
        SELECT comments.*, users.username, users.email, users.id as user_id, 
          (SELECT COUNT(*) FROM comments as replies WHERE replies.parent_id = comments.id) as repliesCount
        FROM comments 
        JOIN users ON comments.user_id = users.id 
        WHERE comments.parent_id IS NULL
        ORDER BY comments.timestamp DESC 
        LIMIT ? OFFSET ?;
      `,
      [limit, offset],
    );

    const comments: CommentData[] = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      const row = results[0].rows.item(i);
      const comment: CommentData = {
        id: row.id,
        content: row.content,
        timestamp: row.timestamp,
        author: {
          username: row.username,
          email: row.email,
          user_id: row.user_id,
        },
        repliesCount: row.repliesCount,
      };
      comments.push(comment);
    }

    return { comments, totalCount };
  } catch (error) {
    console.error('GET COMMENTS DB ERROR', error);
    throw error;
  }
};

export const getRepliesForComment = async (
  parentId: number,
): Promise<GetRepliesResponse> => {
  const db = await openDatabase();

  try {
    const results = await db.executeSql(
      `
        SELECT comments.*, users.username, users.email, users.id as user_id, 
          (SELECT COUNT(*) FROM comments as replies WHERE replies.parent_id = comments.id) as repliesCount
        FROM comments 
        JOIN users ON comments.user_id = users.id 
        WHERE comments.parent_id = ?
        ORDER BY comments.timestamp ASC;
      `,
      [parentId],
    );

    const replies: CommentData[] = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      const row = results[0].rows.item(i);
      const reply: CommentData = {
        id: row.id,
        content: row.content,
        timestamp: row.timestamp,
        parent_id: row.parent_id,
        author: {
          username: row.username,
          email: row.email,
          user_id: row.user_id,
        },
        repliesCount: row.repliesCount,
      };
      replies.push(reply);
    }

    return { replies };
  } catch (error) {
    console.error('GET REPLIES DB ERROR', error);
    throw error;
  }
};

export const clearAllData = async () => {
  const db = await openDatabase();

  try {
    await db.executeSql('DELETE FROM users;');
    await db.executeSql('DELETE FROM comments;');

    await db.executeSql('DELETE FROM sqlite_sequence WHERE name="users";');
    await db.executeSql('DELETE FROM sqlite_sequence WHERE name="comments";');
  } catch (error) {
    console.error('ERROR CLEAR DB:', error);
    throw error;
  }
};
