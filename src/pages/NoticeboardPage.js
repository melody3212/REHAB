// 📁 src/pages/NoticeboardPage.jsx
import React, { useState, useEffect } from 'react';
import '../assets/css/write.css';
import '../assets/css/noticeboard.css';
import Button from '../components/Button';
import InputWhiteField from '../components/InputWhiteField';
import { useNavigate, Link } from 'react-router-dom';
import CarrotIcon from '../assets/images/carroticon.png';
import ComuIcon from '../assets/images/comuicon.png';
import Button1 from '../components/Button1';
import PreviousButton from '../components/PreviousButton';

function NoticeboardPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  // JWT에서 사용자 이름 추출 (토큰 페이로드에 username 필드가 있다고 가정)
  useEffect(() => {
    const authHeader = localStorage.getItem('authToken') || '';
    const [, jwt] = authHeader.split(' ');
    if (jwt) {
      try {
        const payload = JSON.parse(atob(jwt.split('.')[1]));
        setUsername(payload.username || '');
      } catch (e) {
        console.error('JWT 파싱 오류:', e);
      }
    }
  }, []);

  const handleSubmit = () => {
    console.log('폼 제출');
  };

  const handleMatchOk = () => {
    handleSubmit();
    navigate('/matchwriteok');
  };

  return (
    <div className="BoardComponent">
      <PreviousButton />
      <div className="writeTop">유저 게시판</div>

      <div className="noticeboard-title">
        <div className="noticeboard-title-logo">
          <div className="REHUB">REHUB</div>
        </div>
        <div className="noticeboard-title-text">
          <div className="noticeboard-title-text1">리헙 공식 커뮤니티</div>
          <div className="noticeboard-title-text2">글쓰기</div>
        </div>
      </div>

      <div className="noticeboard-profile">
        <img
          src="/images/user2photo.png"
          className="noticeboard-profile-photo"
          alt="프로필"
        />
        <div className="noticeboard-profile-name">
          {username || '익명'}
        </div>
        <div className="noticeboard-profile-detail">
          방문 56  작성글 4  댓글 27
        </div>
      </div>

      <div className="noticeboard-tag">
        <Link to="/dealboard" className="noticeboard-tag1">
          <div className="noticeboard-tag1-icon">
            <img
              src={CarrotIcon}
              style={{ width: '28px', height: '28px' }}
              alt="중고거래 아이콘"
            />
          </div>
          중고거래
        </Link>
        <Link to="/comuboard" className="noticeboard-tag2">
          <div className="noticeboard-tag2-icon">
            <img
              src={ComuIcon}
              style={{ width: '26px', height: '26px' }}
              alt="커뮤니티 아이콘"
            />
          </div>
          커뮤니티
        </Link>
      </div>
    </div>
  );
}

export default NoticeboardPage;
