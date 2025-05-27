// src/components/Mailpopup.js
import React, { useState } from 'react';
import '../assets/css/mailpopup.css';
import Mailpopupicon from '../assets/images/mailpopupicon.png';
import InputWhiteField from './InputWhiteField';
import Button from './Button';

/**
 * Mailpopup 컴포넌트
 * 화면 하단에 고정된 팝업 레이아웃과 코드 인증 기능을 제공합니다.
 * @param {string} email - 인증 메일이 발송된 이메일
 * @param {function} onConfirm - 입력한 코드가 확인 버튼 클릭 시 호출
 * @param {string} errorMessage - 잘못된 코드 입력 시 표시할 오류 메시지
 */
function Mailpopup({ email, onConfirm, errorMessage }) {
  const [inputCode, setInputCode] = useState('');

  return (
    <div className="mailpopup-container">
      <img
        src={Mailpopupicon}
        className="mailpopup-icon"
        alt="Mail Popup Icon"
      />
      <div className="mailpopup-text1">인증 코드를 입력하세요.</div>
      <div className="mailpopup-text2">
        Google에서 다음 이메일로 인증 코드를 전송했습니다. {email}
      </div>

      <InputWhiteField
        type="text"
        name="verificationCode"
        placeholder="6자리 코드를 입력하세요."
        className="mailpopup-input"
        placeholderColor="#A5A6B9"
        fontWeight="400"
        fontSize="16px"
        color="#A5A6B9"
        height="41px"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      {errorMessage && (
        <div className="mailpopup-error">{errorMessage}</div>
      )}
      <Button
        type="button"
        backgroundColor="#578E7E"
        textColor="white"
        className="mailpopup-button"
        onClick={() => onConfirm(inputCode)}
      >
        다음
      </Button>
    </div>
  );
}

export default Mailpopup;