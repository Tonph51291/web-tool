"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, LoginDto, RegisterDto } from "@/types/auth.types";
import { authService } from "@/feature/auth/services/auth.service";
import { tokenStorage } from "@/lib/token";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const token = tokenStorage.get();
      if (!token) {
        setUser(null);
        return;
      }
      const userData = await authService.getMe();
      setUser(userData);
    } catch {
      tokenStorage.remove();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = async (dto: LoginDto) => {
    const res = await authService.login(dto);
    if (res.token) {
      tokenStorage.set(res.token);
    }
    setUser(res.user);
  };

  const register = async (dto: RegisterDto) => {
    const res = await authService.register(dto);
    if (res.token) {
      tokenStorage.set(res.token);
    }
    setUser(res.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      tokenStorage.remove();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ADMIN",
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

