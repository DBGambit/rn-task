import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  initDatabase,
  UserStatus,
  clearAllData,
} from 'src/database/sq-lite-service';

import { globalStorage } from 'src/storage/global';
import { storage } from 'src/storage';

export interface UserData {
  id: number;
  username: string;
  email: string;
  status: UserStatus;
}

interface GlobalContextType {
  user: UserData | null;
  login: (userData: UserData) => Promise<void>;
  logout: () => Promise<void>;
  clearData: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  clearData: async () => {},
});

function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within an GlobalProvider');
  }
  return context;
}

const GlobalProvider = (props: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<UserData | null>(
    globalStorage.get()?.user || null,
  );

  const logout = async () => {
    storage.clearAll();
    setUser(null);
  };

  const clearData = async () => {
    await clearAllData();
    logout();
  };

  const login = async (userData: UserData) => {
    if (userData.status === UserStatus.NEW_USER) {
      globalStorage.addValue('showNewUserGreet', true);
    }

    globalStorage.addValue('user', userData);

    setUser(userData);
  };

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <GlobalContext.Provider
      {...props}
      value={{
        user: user,
        login,
        logout,
        clearData,
      }}
    />
  );
};

export { GlobalProvider, useGlobalContext };
