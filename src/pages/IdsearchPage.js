// === src/pages/PwsearchPage.jsx ===
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/write.css';
import '../assets/css/pwsearch.css';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Mailpopup from '../components/Mailpopup';
import { sendNewPasswordMail, verifyMail, verifyMailForNewPassword } from '../api/auth';


export default function IdsearchPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationKey, setVerificationKey] = useState('');
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [popupError, setPopupError] = useState('');

  const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendCode = async () => {
    if (!email.trim()) return;
    try {
      // 이메일과 인증키를 서버에 전송
      await sendNewPasswordMail({ email, verificationKey: '' });
      setPopupError('');
      setShowMailPopup(true);
    } catch (err) {
      setPopupError(`메일 전송 실패: ${err.message}`);
      setShowMailPopup(true);
    }
  };

  // OTP 확인 함수: 백엔드에서 코드 검증
  const handleVerifyCode = async (inputCode) => {
    if (!inputCode) return;
    try {
      const res = await verifyMailForNewPassword({ email, verificationKey: inputCode });
      // 백엔드 응답 코드에 따라 처리 (예: 에러 코드로 시작하면 실패)
      if (res.code && res.code.startsWith('A')) {
        // 인증 실패
        setPopupError(res.message || '인증번호가 올바르지 않습니다.');
        return;
      }
      // 인증 성공 시 비밀번호 재설정 페이지로 이동
      navigate('/pwreplace');
    } catch (err) {
      setPopupError('인증 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="WriteComponent">
      <div className="writeTop">비밀번호 찾기</div>
      <div className="pwsearch">
        <div className="loginMid-text">REHUB</div>
        <div className="pwsearch-text">
          비밀번호를 찾고자 하는 계정의<br/>이메일을 입력해주세요.
        </div>
      </div>
      <div className="pwsearch-input">
        <InputField
          type="email"
          name="pwsearch-email"
          placeholder="이메일을 입력해주세요."
          className="MatchTitle"
          value={email}
                                          placeholderColor="#A5A6B9"
                                fontWeight="400"
                                fontSize="16px"
                                color="#A5A6B9"
                                height="48px"
                                width="100%"
                                paddingLeft="60px"
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          type="button"
          backgroundColor="#578E7E"
          textColor="white"
          width="100%"
          height="48px"
          fontSize="16px"
          onClick={handleSendCode}
          disabled={!email.trim()}
        >
          인증 코드 받기
        </Button>
      </div>
      {showMailPopup && (
        <Mailpopup
          email={email}
          onConfirm={handleVerifyCode}
          errorMessage={popupError}
        />
      )}
    </div>
  );
}
