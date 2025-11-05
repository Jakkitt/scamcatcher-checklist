// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login, logout, register, updateUser } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  // เมื่อรีเฟรชหน้า จะโหลด user จาก localStorage
  useEffect(() => {
    const saved = getCurrentUser();
    if (saved) setUser(saved);
  }, []);

  const handleLogin = async (data) => {
    const u = await login(data);
    setUser(u);
    return u;
  };

  const handleRegister = async (data) => {
    const u = await register(data);
    setUser(u);
    return u;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleUpdate = (partial) => {
    const updated = updateUser(partial);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateUser: handleUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
