// === src/api/user.js ===
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * 내 정보 조회 API 호출
 * @returns {Promise<{ accountId: string, email: string, username: string, phoneNumber: string, birth: string, userType: string, profileImageUrl?: string}>}
 */
export async function getMyInfo() {
  const authHeader = localStorage.getItem('authToken');
  if (!authHeader) {
    throw new Error('No auth token found');
  }
  const [, jwt] = authHeader.split(' ');
  if (!jwt) {
    throw new Error('Invalid auth token format');
  }

  const response = await axios.post(
    `${API_BASE_URL}/api/user-auth/my-info`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    }
  );

  // 서버 응답에서 data 필드 내부 객체를 반환
  return response.data.data;
}