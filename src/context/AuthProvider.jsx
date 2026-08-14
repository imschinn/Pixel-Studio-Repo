import { createContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, loginUser, registerUser, logoutUser } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const loggedIn = await loginUser(credentials);
    setUser(loggedIn);
    return loggedIn;
  }, []);

  const register = useCallback(async (details) => {
    const created = await registerUser(details);
    setUser(created);
    return created;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
