import { createContext, useContext, useEffect, useState } from "react";

import { authApi, setAuthToken } from "../services/api";

const AuthContext = createContext(null);
const STORAGE_KEY = "portfolio-admin-auth";

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { token: null, user: null };
  });

  useEffect(() => {
    setAuthToken(authState.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const value = {
    token: authState.token,
    user: authState.user,
    isAuthenticated: Boolean(authState.token),
    login: async (payload) => {
      const response = await authApi.login(payload);
      setAuthState({
        token: response.accessToken,
        user: response.user,
      });
      return response;
    },
    logout: () => {
      setAuthState({ token: null, user: null });
      setAuthToken(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
