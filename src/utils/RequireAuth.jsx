import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth({ children }){
  let authed = false;
  try { authed = !!JSON.parse(localStorage.getItem('user')); } catch {}
  const loc = useLocation();
  if (!authed) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}
