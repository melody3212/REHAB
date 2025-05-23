// === src/api/board.js ===
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * 게시글 작성 API 호출
 * @param {{ title: string, content: string, boardType: string, imgUrl?: string }} params
 * @returns {Promise<object>}
 */
export async function boards({ title, content, boardType, imgUrl }) {
  // authToken 형식: "ACCESS_TOKEN <jwt>"으로 저장되어 있음
  const authHeader = localStorage.getItem('authToken');
  if (!authHeader) {
    throw new Error('No auth token found');
  }

  // 실제 서버에서는 "Bearer <jwt>" 형태를 기대할 가능성이 높으므로 토큰 부분만 사용
  const [, jwt] = authHeader.split(' ');
  if (!jwt) {
    throw new Error('Invalid auth token format');
  }

  const response = await axios.post(
    `${API_BASE_URL}/api/boards`,
    { title, content, boardType, imgUrl },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    }
  );

  console.log('Sent Authorization:', `Bearer ${jwt}`);
  return response.data;
}

/**
 * 댓글 작성 API 호출
 * @param {{ boardId: number, content: string }} params
 * @returns {Promise<object>}
 */
export async function comments({ boardId, content }) {
  // authToken 형식: "ACCESS_TOKEN <jwt>"으로 저장되어 있음
  const authHeader = localStorage.getItem('authToken');
  if (!authHeader) {
    throw new Error('No auth token found');
  }

  // 실제 서버에서는 "Bearer <jwt>" 형태를 기대할 가능성이 높으므로 토큰 부분만 사용
  const [, jwt] = authHeader.split(' ');
  if (!jwt) {
    throw new Error('Invalid auth token format');
  }

  const response = await axios.post(
    `${API_BASE_URL}/api/boards/${boardId}/comments`,
    { content },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    }
  );

  console.log('Sent Authorization:', `Bearer ${jwt}`);
  return response.data;
}
