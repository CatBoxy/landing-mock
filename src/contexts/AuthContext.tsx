"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService, type User } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = () => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    // Initialize auth state from localStorage
    refreshAuth();
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const isAuthenticated = !!user && AuthService.isAuthenticated();
  const isAdmin = AuthService.isAdmin();

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    refreshAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
