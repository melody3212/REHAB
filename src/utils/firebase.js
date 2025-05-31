// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: 'G-QV9Y9JVN1H'
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 푸시 권한 요청 함수
export async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
      });
      if (token) {
        console.log(`푸시 토큰 발급 완료: ${token}`);
        return token;
      } else {
        console.warn('푸시 토큰이 존재하지 않음');
        return null;
      }
    } else {
      console.warn('사용자가 푸시 권한 거부');
      return null;
    }
  } catch (err) {
    console.error('푸시 토큰 요청 실패:', err);
    return null;
  }
}