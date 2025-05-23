// src/api/auth.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * 이메일 인증 메일 발송 API
 * @param {{ email: string, verificationKey: string }} params
 * @returns {Promise<object>}
 */
export async function sendVerificationMail({ email, verificationKey }) {
  const response = await axios.post(
    `${API_BASE_URL}/api/user-auth/send-verification-mail`,
    { email, verificationKey },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
}

/**
 * 이메일 인증 코드 검증 API
 * @param {{ email: string, verificationKey: string }} params
 * @returns {Promise<object>}
 */
export async function verifyMail({ email, verificationKey }) {
  const response = await axios.post(
    `${API_BASE_URL}/api/user-auth/verification-mail`,
    { email, verificationKey },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
}

/**
 * 회원가입 API
 * @param {object} payload - JSON 형태의 가입 정보
 * @returns {Promise<object>}
 */
export async function signupUser(payload) {
  const response = await axios.post(
    `${API_BASE_URL}/api/user-auth/signup`,
    payload,
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
}

/**
 * 로그인 API
 * @param {{ accountId: string, password: string }} params
 * @returns {Promise<{ tokenType: string, token: string }>}
 */
export async function loginUser({ accountId, password }) {
  const response = await axios.post(
    `${API_BASE_URL}/api/user-auth/login`,
    { accountId, password },
    { headers: { 'Content-Type': 'application/json' } }
  );
  const { data } = response.data;
  const { tokenType, token } = data;
  localStorage.setItem('authToken', `${tokenType} ${token}`);
  return { tokenType, token };
}
