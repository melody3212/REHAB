import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/PreviousButton.css'; // CSS 파일 경로 (필요시)
import backIcon from '../assets/images/backicon.svg';

const PreviousButton = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleClick = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <button className="previous-button" onClick={handleClick}>
            <img src={backIcon} alt="이전" /> {/* 이미지 경로 수정 */}
        </button>
    );
};

export default PreviousButton;