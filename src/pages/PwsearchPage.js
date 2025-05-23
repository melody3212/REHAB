import '../assets/css/write.css';
import '../assets/css/pwsearch.css';
import Button from '../components/Button.js';
import InputWhiteField from '../components/InputWhiteField.js';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField.js';


function PwsearchPage() {

const navigate = useNavigate();

    const handleSubmit = () => {
        // 제출 로직 작성
        console.log('폼 제출');
    };

    const handleMatchOk = () => {
        handleSubmit(); // 제출 로직 실행
        navigate('/matchwriteok'); // '/signup'으로 라우팅
    };

    return (
        <div className="WriteComponent">
            <div className="writeTop">
                비밀번호 찾기
            </div>
            <div className='pwsearch'>
                <div className='loginMid-text'>REHUB</div>
                    <div className="pwsearch-text">비밀번호를 찾고자하는 계정의 <br/>
                    이메일을 입력해주세요.</div>
                </div>
            <div className='pwsearch-input'>
                <InputField
                                type="text"
                                name="pwsearch-inputfield"
                                placeholder={"이메일을 입력해주세요."}
                                className="MatchTitle"

                                placeholderColor="#A5A6B9"
                                fontWeight="400"
                                fontSize="16px"
                                color="#A5A6B9"
                                height="48px"
                                width="100%"
                                paddingLeft="60px"
                                
                            />
                
                <Button
                        backgroundColor="#578E7E" // 초록색
                        textColor="white"
                        width="100%"
                        height="48px"
                        fontSize="16px"
                        
                    >
            인증 코드 받기
            </Button>
            </div>
        </div>
    );
}

export default PwsearchPage;
