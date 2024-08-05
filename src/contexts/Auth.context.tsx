import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { axiosUtils } from '@/lib/axios/axios';
import { request } from '@/lib/axios/request';
import storage, { EStorageKey } from '@/lib/localStorage';

interface AuthContextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  accessToken: string;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<void>;
  fetchMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    const response = await request<{ accessToken: string }>('/auth/login', {
      method: 'POST',
      data: { email, password },
    });
    setAccessToken(response.accessToken);
  };

  const signup = async (email: string, name: string, password: string) => {
    const response = await request('/auth/signup', {
      method: 'POST',
      data: { email, password, name },
    });
    setUser(response.data.user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(EStorageKey.ACCESS_TOKEN);
    request('/auth/logout');
  };

  const forgotPassword = async (email: string) => {
    await request('/auth/forgot-password', {
      method: 'POST',
      data: { email },
    });
  };

  const updatePassword = async (token: string, newPassword: string) => {
    await request('/auth/update-password', {
      method: 'POST',
      data: { token, newPassword },
    });
  };

  const fetchMe = async () => {
    const response = await request('/user/profile', {
      method: 'GET',
    });
    setUser(response.data);
  };

  useEffect(() => {
    if (accessToken && !user) {
      storage.set(EStorageKey.ACCESS_TOKEN, accessToken);
      axiosUtils.setHeader('Authorization', `Bearer ${accessToken}`);
      fetchMe();
    }
  }, [accessToken, user]);

  useEffect(() => {
    const token = storage.get(EStorageKey.ACCESS_TOKEN);
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        signup,
        logout,
        forgotPassword,
        updatePassword,
        fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
