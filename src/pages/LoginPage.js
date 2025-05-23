// src/pages/LoginPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/loginPage.css';
import GroupIcon from '../assets/images/groupicon.svg';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import InputField from '../components/InputField';
import { loginUser } from '../api/auth';
import PreviousButton from '../components/PreviousButton';

function LoginPage() {
  const navigate = useNavigate();
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [isPatient, setIsPatient] = useState(false);
  const [isCaregiver, setIsCaregiver] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ accountId, password });
      // 로그인 성공 시, 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(
        `로그인 실패: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <form className="LoginComponent" onSubmit={handleSubmit}>
      
      <div className="loginTop">
        <span className="loginchar1">재</span>미있고 <span className="loginchar1">활</span>기차게<br />
        <span className="loginTop2">재활의 중심</span>
      </div>

      <div className="loginMid">
        <img src={GroupIcon} alt="Check Icon" className="loginIcon" />
        <div className="loginMid-text">REHUB</div>
      </div>

      <div className="loginCkbox">
        환자
        <Checkbox
          checked={isPatient}
          onChange={e => setIsPatient(e.target.checked)}
        />
        간병인
        <Checkbox
          checked={isCaregiver}
          onChange={e => setIsCaregiver(e.target.checked)}
        />        
      </div>

      <div className="loginInput">
        <span className="signupForm-text">아이디</span>
        <InputField
          type="text"
          name="accountId"
          placeholder="아이디를 입력해주세요"
          className="SignupinputField"
          value={accountId}
          onChange={e => setAccountId(e.target.value)}
        />
      </div>

      <div className="signupForm-pw">
        <span className="signupForm-text">비밀번호</span>
        <InputField
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          className="SignupinputField-pw"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="loginButton">
        <Button
          type="submit"
          backgroundColor="#578E7E"
          textColor="white"
          width="100%"
          height="48px"
        >
          로그인
        </Button>

        <div className="loginLine"></div>

        <Button
          type="button"
          backgroundColor="#F7F7FB"
          textColor="black"
          width="100%"
          height="48px"
          onClick={() => navigate('/signup')}
        >
          회원가입
        </Button>

        <div className="loginEnd">
          <span
            onClick={() => navigate('/find-id')}
            style={{ cursor: 'pointer' }}
          >
            아이디 찾기
          </span>
          <span
            onClick={() => navigate('/pwsearch')}
            style={{ cursor: 'pointer', marginLeft: '22px' }}
          >
            비밀번호 찾기
          </span>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
