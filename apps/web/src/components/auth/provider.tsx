"use client";

import { createContext, useContext } from "react";
import type { AuthContextType } from "./type";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
  contextValue: AuthContextType;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
  contextValue,
}) => {
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
