import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, fetchCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('taskflow_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetchCurrentUser()
      .then(setUser)
      .catch(() => localStorage.removeItem('taskflow_token'))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const { token, user } = await loginUser(credentials);
    localStorage.setItem('taskflow_token', token);
    setUser(user);
    return user;
  }, []);

  const register = useCallback(async (payload) => {
    const { token, user } = await registerUser(payload);
    localStorage.setItem('taskflow_token', token);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('taskflow_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider.');
  }
  return context;
}
