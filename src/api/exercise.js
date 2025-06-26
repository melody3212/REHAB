// src/api/exercise.js
import axios from 'axios';
import { getAuthToken } from '../lib/authToken';

const API_BASE_URL = 
  process.env.REACT_APP_API_BASE_URL || ''; 

/**
 * 운동 일정 생성 API POST 
 */
export async function createExercise({ content, description, sets, reps }) {
  const token = getAuthToken();
  const response = await axios.post(
    `${API_BASE_URL}/api/exercises`,
    { content, description, sets, reps },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      withCredentials: true,
    }
  );
  return response.data.data;
}

/**
 * 운동 조회 API GET 
 */
export async function getExercise() {
  const token = getAuthToken();
  const response = await axios.get(
    `${API_BASE_URL}/api/exercises/my`,
    { 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      withCredentials: true,
    }
  );
  return response.data.data;
}

/**
 * 운동 수정 API PUT 
 */
export async function updateExercise({ exerciseId, content, description, sets, reps }) {
  const token = getAuthToken();
  const response = await axios.put(
    `${API_BASE_URL}/api/exercises/${exerciseId}`,
    { content, description, sets, reps },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      withCredentials: true,
    }
  );
  return response.data.data;
}

/**
 * 운동 삭제 API DELETE
 *
 * → 인자로 id(숫자 or 문자열)만 받도록 변경했습니다.
 */
export async function deleteExercise(exerciseId) {
  const token = getAuthToken();
  const response = await axios.delete(
    `${API_BASE_URL}/api/exercises/${exerciseId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      withCredentials: true,
    }
  );
  return response.data.data;
}
