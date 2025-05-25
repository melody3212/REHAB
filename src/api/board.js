// === src/api/board.js ===
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * 게시글 작성 API 호출
 * @param {{ title: string, content: string, boardType: string, imgUrl?: string }} params
 * @returns {Promise<object>}
 */
export async function boards({ title, content, boardType, imgUrl }) {
  const authHeader = localStorage.getItem('authToken');
  if (!authHeader) {
    throw new Error('No auth token found');
  }
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
  return response.data;
}

/**
 * 댓글 작성 API 호출
 * @param {{ boardId: number, content: string }} params
 * @returns {Promise<object>}
 */
export async function comments({ boardId, content }) {
  const authHeader = localStorage.getItem('authToken');
  if (!authHeader) {
    throw new Error('No auth token found');
  }
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
  return response.data;
}

/**
 * 게시글 삭제 API 호출
 * @param {number} boardId
 * @returns {Promise<object>}
 */
export async function deleteBoard(boardId) {
  const authHeader = localStorage.getItem('authToken');
  if (!authHeader) {
    throw new Error('No auth token found');
  }
  const [, jwt] = authHeader.split(' ');
  if (!jwt) {
    throw new Error('Invalid auth token format');
  }

  const response = await axios.delete(
    `${API_BASE_URL}/api/boards/${boardId}`,
    {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }
  );
  return response.data;
}

/**
 * 댓글 삭제 API 호출
 * @param {number} boardId
 * @param {number} commentId
 */
export async function deleteComment(boardId, commentId) {
  const authHeader = localStorage.getItem('authToken');
  if (!authHeader) throw new Error('No auth token found');
  const [, jwt] = authHeader.split(' ');
  const response = await axios.delete(
    `${API_BASE_URL}/api/boards/${boardId}/comments/${commentId}`,
    { headers: { Authorization: `Bearer ${jwt}` } }
  );
  return response.data;
}