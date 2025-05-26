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
import { getMyInfo } from '../api/user';
import DefaultProfile from '../assets/images/default-profile.png';

function NoticeboardPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(DefaultProfile);

  useEffect(() => {
    getMyInfo()
      .then(({ username, profileImageUrl }) => {
        setUsername(username || '익명');
        // API에서 제공하는 프로필 이미지 URL이 있을 경우 사용, 없으면 기본 이미지
        setProfilePhoto(profileImageUrl || DefaultProfile);
      })
      .catch((error) => {
        console.error('내 정보 조회 오류:', error);
      });
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
          src={profilePhoto}
          className="noticeboard-profile-photo"
          alt="프로필"
        />
        <div className="noticeboard-profile-name">
          {username}
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
