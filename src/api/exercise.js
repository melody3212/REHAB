import axios from 'axios';

import { getAuthToken } from '../lib/authToken';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * 운동 일정 생성 API
 * @param {{ content:string, description:string }}
 * @returns {{ id, content, description, createAt }}
 */
export async function createExercise({ content, description , sets, reps}) {
    const authorization = getAuthToken();

    const response = await axios.post(
    `${API_BASE_URL}/api/exercise`,
    { content, description, sets, reps },
    { 
      headers: { 
        'Content-Type': 'application/json' ,
        'Authorization': authorization
      },
      withCredentials: true,
    }
    )

    return response.data.data;
}

/**
 * 운동 조회 API
 * @return {{ list<{id, content, description, createAt} }}
 */
export async function getExercise() {
    const authorization = getAuthToken();

    const response = await axios.get(
    `${API_BASE_URL}/api/exercise`,
    { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': authorization
       },
      withCredentials: true,
    }
    )

    return response.data.data;
}

/**
 * 운동 기록 수정 API
 * @param { exerciseId:string, content:string, description:string} param0 
 * @returns { 수정된 {id, content, description, createAt} }
 */
export async function updateExercise({ exerciseId, content, discription }) {
    const authorization = getAuthToken();

    const response = await axios.put(
    `${API_BASE_URL}/api/exercise/${exerciseId}`,
    { content, discription },
    { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': authorization
     },
      withCredentials: true,
    }
    )

    return response.data.data;
}

/**
 * 운동 기록 삭제 API
 * @param { {id} } param0 
 * @returns { 삭제 완료 메시지 }
 */
export async function deleteExercise({ exerciseId }) {
    const authorization = getAuthToken();

    const response = await axios.delete(
    `${API_BASE_URL}/api/exercise/${exerciseId}`,
    { 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': authorization
       },
      withCredentials: true,
    }
    )

    return response.data.data;
}