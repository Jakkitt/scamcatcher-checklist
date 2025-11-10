import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireRole({ role = 'admin', children }) {
  const { user } = useAuth();
  const loc = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: loc }} />;
  if (user?.role !== role) return <Navigate to="/" replace />;
  return children;
}

