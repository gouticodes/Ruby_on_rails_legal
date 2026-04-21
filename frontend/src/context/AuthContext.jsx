import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/services';
import { storage } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storage.getUser());
  const [token, setToken] = useState(storage.getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await authApi.me();
        setUser(data.user);
        storage.setUser(data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, [token]);

  const login = ({ token: nextToken, user: nextUser }) => {
    setToken(nextToken);
    setUser(nextUser);
    storage.setToken(nextToken);
    storage.setUser(nextUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    storage.clearToken();
    storage.clearUser();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === 'admin',
      login,
      logout,
    }),
    [loading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
