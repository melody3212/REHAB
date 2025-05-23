import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function isAuthenticated() {
  // 예시: localStorage에 토큰이 있으면 로그인 상태로 간주
  const token = localStorage.getItem('authToken');
  return Boolean(token);
}

// Outlet을 사용해서 자식 라우트를 렌더하거나, Navigate로 리다이렉트
export default function ProtectedRoute() {
  return isAuthenticated()
    ? <Outlet />
    : <Navigate to="/login" replace />;
}