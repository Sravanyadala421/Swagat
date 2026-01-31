import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserType } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string, isInternal: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { authService } from '../services/api';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, name: string, isInternal: boolean): Promise<boolean> => {
    try {
      // We are hijacking the existing signature to fit the new API
      // ideally we should refactor the interface, but to keep changes minimal:
      // 'name' and 'isInternal' might be ignored for login if purely email/password, 
      // but here we are simulating the "Sign Up / Login" hybrid flow or just assuming strict login.

      // For the purpose of this transition: 
      // If it's a new backend, we need a password. 
      // The current UI only asks for Email and Name.
      // I will assume a default password for now or modify the UI later. 
      // **CRITICAL**: The current UI implementation in LoginPage.tsx only takes Email and Name.
      // To make this work with minimal UI changes, I will try to REGISTER first, if exists, then LOGIN.
      // PASSWORD will be "password123" hardcoded for this prototype phase unless UI changes.

      const password = "password123";

      try {
        const { data } = await authService.login({ email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return true;
      } catch (loginError: any) {
        // If login fails, maybe user doesn't exist? Try register?
        // But existing backend sends 404 for user not found.
        if (loginError.response && loginError.response.status === 404) {
          const { data } = await authService.register({ name, email, password, isInternal });
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          return true;
        }
        throw loginError;
      }
    } catch (error) {
      console.error("Auth Error", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
