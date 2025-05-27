import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/CbtPage.css';
import MatchBackButton from '../components/MatchbackButton';
import SendIcon from '../assets/images/image15.png';
import Button from '../components/Button';

function CbtPage() {
  const navigate = useNavigate();
  const [mood, setMood] = useState('');

  const handleSend = () => {
    // TODO: 전송 로직 추가
    console.log('오늘의 기분:', mood);
    setMood('');
  };

  return (
    <div className="CbtComponent">
        <MatchBackButton />
      {/* 상단 바 */}
      <div className="CbtTop">
        
        <h1>인지행동치료</h1>
      </div>

      {/* 인사말 */}
      <div className="CbtTextSection">
        <p className="CbtBold">안녕하세요.</p>
        <p className="CbtBold">오늘 하루는 어떠셨나요?</p>
      </div>

      {/* 기분 입력창 */}
      <div className="CbtInputBox">
        <input
          type="text"
          placeholder="오늘의 기분을 적어주세요!"
          value={mood}
          onChange={e => setMood(e.target.value)}
          className="CbtInput"
        />
        <button className="CbtSendBtn" onClick={handleSend}>
          <img src={SendIcon} alt="전송버튼"  className='CbtSendBtn'/>
        </button>
      </div>

      {/* 게임 선택 버튼군 */}
      <div className="CbtButtonGroup">
        <button
          width="100%"
          height="48px"
          onClick={() => navigate('/word-association')}
        >
          단어 연상 게임
        </button>
        <button
          width="100%"
          height="48px"
          onClick={() => navigate('/memory-game')}
        >
          기억력 게임
        </button>
        <button
          width="100%"
          height="48px"
          onClick={() => navigate('/problem-solving-game')}
        >
          문제 해결 게임
        </button>
      </div>
    </div>
  );
}

export default CbtPage;
