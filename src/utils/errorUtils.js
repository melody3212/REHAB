// src/utils/errorUtils.ts

/**
 * 서버 응답 또는 일반 오류 객체에서 사용자 친화적인 메시지를 추출합니다.
 */
export function extractErrorMessage(err) {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.message) return err.message;
  return '알 수 없는 오류가 발생했습니다.';
}