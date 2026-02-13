import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken } from '../services/api';
import { Platform } from 'react-native';

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored auth data on startup
  useEffect(() => {
    const loadStoredAuth = () => {
      try {
        if (Platform.OS === 'web') {
          const storedToken = localStorage.getItem('auth_token');
          const storedUser = localStorage.getItem('auth_user');

          if (storedToken && storedUser) {
            const userData = JSON.parse(storedUser);
            setToken(storedToken);
            setUser(userData);
            setAuthToken(storedToken);
            console.log('AuthContext: Restored session from localStorage');
          }
        }
      } catch (error) {
        console.error('AuthContext: Error loading stored auth', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredAuth();
  }, []);

  const login = (newToken: string, userData: any) => {
    setToken(newToken);
    setUser(userData);
    setAuthToken(newToken);

    if (Platform.OS === 'web') {
      localStorage.setItem('auth_token', newToken);
      localStorage.setItem('auth_user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);

    if (Platform.OS === 'web') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
