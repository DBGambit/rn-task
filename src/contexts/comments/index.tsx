import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getTopLevelComments,
  addComment,
  getRepliesForComment,
  CommentData,
} from 'src/database/sq-lite-service';
import { useGlobalContext } from '../global';

import { PAGINATION_DEFAULT_LIMIT } from 'src/constants';

interface CreateModal {
  isOpen: boolean;
  data: CommentData | null;
  onSuccess?: () => void;
}

interface CommentsContextType {
  comments: CommentData[];
  totalCount: number;
  isNextPageAvailable: boolean;
  isLoading: boolean;
  currentPage: number;
  createModal: CreateModal;
  setPage: (page: number) => void;
  addComment: (
    userId: number,
    content: string,
    parentId: number | null,
  ) => void;
  getCommentReplies: (parentId: number) => Promise<CommentData[]>;
  setCreateModalData: (modalData: CreateModal) => void;
  getComments: () => Promise<void>;
  reset: () => void;
}

const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  totalCount: 0,
  isNextPageAvailable: false,
  isLoading: false,
  currentPage: 1,
  createModal: {
    isOpen: false,
    data: null,
  },
  setPage: () => null,
  addComment: () => null,
  getCommentReplies: async () => Promise.resolve([]),
  setCreateModalData: () => null,
  getComments: async () => Promise.resolve(),
  reset: () => null,
});

function useCommentsContext() {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error(
      'useCommentsContext must be used within an CommentsProvider',
    );
  }
  return context;
}

const CommentsProvider = (props: { children: ReactNode }): ReactElement => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useGlobalContext();

  const [createModal, setCreateModal] = useState<CreateModal>({
    isOpen: false,
    data: null,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const isNextPageAvailable =
    totalCount > currentPage * PAGINATION_DEFAULT_LIMIT;

  const getComments = async () => {
    try {
      setIsLoading(true);
      const response = await getTopLevelComments(
        (currentPage - 1) * PAGINATION_DEFAULT_LIMIT,
        PAGINATION_DEFAULT_LIMIT,
      );

      setComments(response.comments);
      setTotalCount(response.totalCount);
    } catch (e) {
      console.log('GET COMMENTS ERROR', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (
    userId: number,
    content: string,
    parentId: number | null = null,
  ) => {
    try {
      await addComment(userId, content, parentId);
    } catch (e) {
      console.log('ADD COMMENT ERROR', e);
    }
  };

  const getCommentReplies = async (parentId: number) => {
    try {
      const response = await getRepliesForComment(parentId);

      return response.replies;
    } catch (e) {
      console.log('GET COMMENT REPLIES ERROR', e);
      return [];
    }
  };

  const setPage = (page: number) => {
    if (page < 1 || page > Math.ceil(totalCount / PAGINATION_DEFAULT_LIMIT))
      return;

    setCurrentPage(page);
  };

  const setCreateModalData = (modalData: CreateModal) => {
    setCreateModal(modalData);
  };

  const reset = async () => {
    setPage(1);
    await getComments();
  };

  useEffect(() => {
    if (!user) return;

    getComments();
  }, [currentPage, user]);

  return (
    <CommentsContext.Provider
      {...props}
      value={{
        comments,
        totalCount,
        isNextPageAvailable,
        isLoading,
        currentPage,
        createModal,
        setPage,
        addComment: handleAddComment,
        getCommentReplies,
        setCreateModalData,
        getComments,
        reset,
      }}
    />
  );
};

export { CommentsProvider, useCommentsContext };
