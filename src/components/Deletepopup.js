// === src/components/Deletepopup.js ===
import React from 'react';
import '../assets/css/popup.css';
import Button from './Button';

/**
 * Deletepopup 컴포넌트
 * @param {function} onCancel - 팝업 닫기 핸들러
 * @param {function} onConfirm - 삭제 확정 핸들러
 */
function Deletepopup({ onCancel, onConfirm }) {
  return (
    <div className="popup-container">
      <div className="popup-text">
        글 삭제하기
      </div>
      <div className="popup-button">
        <Button 
            width='63px'
            backgroundColor='rgba(87, 142, 126, 0.50)' 
            className ="popup-button1" onClick={onCancel}>취소</Button>
        <Button 
            width='130px'
            backgroundColor= '#578E7E'
            className ="popup-button2" onClick={onConfirm}>삭제하기</Button>
      </div>
    </div>
  );
}

export default Deletepopup;
