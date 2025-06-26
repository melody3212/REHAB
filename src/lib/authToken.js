// src/lib/authToken.js


export function getAuthToken() {
  // 1) 로컬스토리지에서 순수 토큰만 꺼내옴
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  // 2) split 제거, 바로 Bearer 헤더 형태로
  return `Bearer ${token}`;
}

export function isLoggedIn() {
  return !!localStorage.getItem('authToken');
}

export function clearAuthToken() {
  localStorage.removeItem('authToken');
}
