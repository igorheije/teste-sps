import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../configs/api";
import { getMe } from "../services/UserService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await getMe();
      setUser(response.data.user);
    } catch (error) {
      console.error("Token inválido:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
      });

      const { token: newToken, user: userData } = response.data;

      setToken(newToken);
      setUser(userData);

      localStorage.setItem("token", newToken);

      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Erro ao fazer login",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
