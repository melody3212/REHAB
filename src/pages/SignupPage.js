// src/pages/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/signupPage.css';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import InputField from '../components/InputField';
import { signupUser, sendVerificationMail, verifyMailForSignup } from '../api/auth';
import Mailpopup from '../components/Mailpopup';
import PreviousButton from '../components/PreviousButton';
import { extractErrorMessage } from '../utils/errorUtils'; // 반환되는 error message

const BIRTHDAY_YEAR_LIST = Array.from({ length: 15 }, (_, i) => `${1990 + i}`);
const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

function SignupPage() {
  const navigate = useNavigate();

  // 회원가입 폼 상태
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckTouched, setPasswordCheckTouched] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [year, setYear] = useState(BIRTHDAY_YEAR_LIST[0]);
  const [month, setMonth] = useState(BIRTHDAY_MONTH_LIST[0]);
  const [day, setDay] = useState(BIRTHDAY_DAY_LIST[0]);

  // 환자/간병인 체크박스 상태
  const [isPatient, setIsPatient] = useState(false);
  const [isCaregiver, setIsCaregiver] = useState(false);

  // 이메일 인증 상태
  const [verificationKey, setVerificationKey] = useState('');
  const [verifiedKey, setVerifiedKey] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [popupError, setPopupError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 폼 유효성 검사
  const isFormValid =
    id.trim() &&
    password &&
    passwordCheck &&
    name.trim() &&
    phone.trim() &&
    email1.trim() &&
    email2.trim() &&
    password === passwordCheck;

  // 사용자 유형 선택 유효성
  const isUserTypeSelected = isPatient || isCaregiver;

  // 6자리 인증 코드 생성
  const generateVerificationCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  // 인증 메일 발송
  const handleSendVerificationMail = async () => {
    const email = `${email1}@${email2}`;
    if (!email1 || !email2) {
      setVerificationMessage('이메일을 입력해주세요.');
      return;
    }

    try {
      await sendVerificationMail({ email, verificationKey: '' });
      setVerificationMessage('인증 메일이 발송되었습니다. 이메일을 확인해주세요.');
      setShowMailPopup(true);
      setPopupError('');
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      setVerificationMessage(`오류: ${errorMessage}`);
    }
  };

  // 팝업에서 인증번호 확인
  const handleVerifyCode = async (inputCode) => {
    try {
      await verifyMailForSignup({
        email: `${email1}@${email2}`,
        verificationKey: inputCode,
      });
      setIsEmailVerified(true);
      setVerifiedKey(inputCode);
      setShowMailPopup(false);
      setVerificationMessage('이메일이 성공적으로 인증되었습니다.');
      setPopupError('');
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      setPopupError(`오류: ${errorMessage}`);
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setVerificationMessage('모든 항목을 정확히 입력해주세요.');
      return;
    }
    if (!isUserTypeSelected) {
      setVerificationMessage('사용자 유형을 선택해주세요.');
      return;
    }
    if (!isEmailVerified) {
      setVerificationMessage('이메일 인증을 완료해주세요.');
      return;
    }

    const userType = isPatient ? 'PATIENT' : 'CAREGIVER';

    const payload = {
      accountId: id,
      email: `${email1}@${email2}`,
      password,
      check_password: passwordCheck,
      certificationKey: verifiedKey,
      username: name,
      phoneNumber: phone,
      birth: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
      userType,
    };

    try {
      await signupUser(payload);
      navigate('/signupok');
    } catch (err) {
      console.error(err);
      setVerificationMessage('회원가입 중 오류가 발생했습니다.');
    }
  };

  const submitBg =
    isFormValid && isUserTypeSelected && isEmailVerified
      ? '#578E7E'
      : 'rgba(87, 142, 126, 0.5)';

  return (
    <>
      <PreviousButton />
      <form className="SignComponent" onSubmit={handleSubmit}>
        
        <div className="signupHeader">회원가입 </div>
        
        <div className="signupForm">
          
          {/* 아이디 */}
          <div className="signupForm-id">
            <div className="signupForm-idform">
              <span className="signupForm-text">아이디</span>
              <span className="signupForm-text2">
                {!id && '아이디를 입력해주세요.'}
              </span>
            </div>
            <InputField
              type="text"
              name="id"
              placeholder="아이디 입력(6~20자)"
              className="SignupinputField"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className="signupForm-pw">
            <span className="signupForm-text">비밀번호</span>
            <InputField
              type="password"
              name="password"
              placeholder="비밀번호 입력(영문, 숫자, 특수문자 포함 8~20자)"
              className="SignupinputField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="signupForm-pwck">
            <div className="signupForm-pwform">
              <span className="signupForm-text">비밀번호 확인</span>
              {passwordCheckTouched &&
                passwordCheck &&
                password !== passwordCheck && (
                  <span className="signupForm-text2">
                    비밀번호가 일치하지 않습니다.
                  </span>
                )}
            </div>
            <InputField
              type="password"
              name="passwordcheck"
              placeholder="비밀번호 재입력"
              className="SignupinputField"
              value={passwordCheck}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
                setPasswordCheckTouched(true);
              }}
            />
          </div>

          {/* 이름 */}
          <div className="signupForm-name">
            <span className="signupForm-text">이름</span>
            <InputField
              type="text"
              name="name"
              placeholder="이름을 입력해주세요."
              className="SignupinputField"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 전화번호 */}
          <div className="signupForm-number">
            <span className="signupForm-text">전화번호</span>
            <InputField
              type="text"
              name="phone"
              placeholder="휴대폰 번호 입력(‘-’ 제외 11자리 입력)"
              className="SignupinputField"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* 생년월일 */}
          <div className="signupForm-birthdate">
            <span className="signupForm-text">생년월일</span>
            <div className="signupForm-birth-detail">
              <div className="select-wrapper">
                <select
                  className="birthdayBox yearBox"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {BIRTHDAY_YEAR_LIST.map((y) => (
                    <option key={y} value={y}>
                      {y}년
                    </option>
                  ))}
                </select>
                <span className="select-arrow">V</span>
              </div>
              <div className="select-wrapper">
                <select
                  className="birthdayBox monthBox"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {BIRTHDAY_MONTH_LIST.map((m) => (
                    <option key={m} value={m}>
                      {m}월
                    </option>
                  ))}
                </select>
                <span className="select-arrow">V</span>
              </div>
              <div className="select-wrapper">
                <select
                  className="birthdayBox dayBox"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  {BIRTHDAY_DAY_LIST.map((d) => (
                    <option key={d} value={d}>
                      {d}일
                    </option>
                  ))}
                </select>
                <span className="select-arrow">V</span>
              </div>
            </div>
          </div>

          {/* 이메일 */}
          <div className="signupForm-email">
            <span className="signupForm-text">이메일 주소</span>
            <div className="signupForm-email-detail">
              <InputField
                type="text"
                name="email1"
                placeholder="이메일 주소"
                className="SignupinputField-email"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
              />
              @
              <InputField
                type="text"
                name="email2"
                placeholder="gmail.com"
                className="SignupinputField-email"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
              />
            </div>
          </div>

          {/* 이메일 인증 */}
          <div className="email-check">
            <Button
              type="button"
              backgroundColor={isEmailVerified ? '#AAA' : '#578E7E'}
              textColor="white"
              fontSize="14px"
              onClick={handleSendVerificationMail}
              width="100%"
              fontWeight="700"
              disabled={isEmailVerified}
            >
              {isEmailVerified ? '인증 완료' : '이메일 인증하기'}
            </Button>
            <div className="signupForm-text3">
              {verificationMessage || '이메일을 인증해주세요.'}
            </div>
          </div>

          {/* 사용자 유형 체크박스 */}
          <div className="signupCheckbox">
            환자
            <Checkbox
              checked={isPatient}
              onChange={e => {
                const checked = e.target.checked;
                setIsPatient(checked);
                if (checked) setIsCaregiver(false);
              }}
              name="patient"
            />
            간병인
            <Checkbox
              checked={isCaregiver}
              onChange={e => {
                const checked = e.target.checked;
                setIsCaregiver(checked);
                if (checked) setIsPatient(false);
              }}
              name="caregiver"
            />
          </div>

          {/* 가입/취소 버튼 */}
          <div className="signupButton">
            <Button
              type="submit"
              backgroundColor={submitBg}
              textColor="white"
              disabled={!isFormValid || !isUserTypeSelected || !isEmailVerified}
            >
              가입하기
            </Button>
            <Button
              type="button"
              backgroundColor="#578E7E"
              textColor="white"
              onClick={() => navigate('/')}
            >
              가입 취소
            </Button>
          </div>
        </div>
      </form>

      {/* 인증 팝업 */}
      {showMailPopup && (
        <Mailpopup
          email={`${email1}@${email2}`}
          onConfirm={handleVerifyCode}
          errorMessage={popupError}
        />
      )}
    </>
  );
}

export default SignupPage;
