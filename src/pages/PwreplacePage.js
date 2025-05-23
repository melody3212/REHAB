import '../assets/css/write.css';
import '../assets/css/pwreplace.css'
import '../assets/css/signupPage.css';
import Button from '../components/Button.js';
import InputWhiteField from '../components/InputWhiteField.js';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField.js';


function PwreplacePage() {

const navigate = useNavigate();

    const handleSubmit = () => {
        // 제출 로직 작성
        console.log('폼 제출');
    };

    const handlepwreplaceOk = () => {
        handleSubmit(); // 제출 로직 실행
        navigate('/pwreplaceok'); // '/signup'으로 라우팅
    };

    return (
        <div className="WriteComponent">
            <div className="writeTop">
                비밀번호 재설정
            </div>
            <div className='pwreplace'>
                
                    <div className="pwsearch-text">로그인을 완료하려면 <br/>
                    새 비밀번호를 입력해 주세요.</div>
                </div>
            <div className='pwreplace-input'>
                <div className='pwreplace-toptext'>비밀번호</div>
                <InputField
                                type="text"
                                name="pwsearch-inputfield"
                                placeholder={"비밀번호 입력(영문, 숫자, 특수문자 포함 8~20자)"}
                                className="pwreplaceForm"

                                placeholderColor="#A5A6B9"
                                fontWeight="400"
                                fontSize="13px"
                                color="#A5A6B9"
                                height="48px"
                                width="100%"
     
                                
                            />
                                <InputField
                                type="text"
                                name="pwsearch-inputfield"
                                placeholder={"비밀번호 재입력"}
                                className="pwreplaceForm"

                                placeholderColor="#A5A6B9"
                                fontWeight="400"
                                fontSize="13px"
                                color="#A5A6B9"
                                height="48px"
                                width="100%"

                                
                            />

                            <div className='pwreplace-text'>
                            * 비밀번호는 8~20자의 영문, 숫자, 특수문자를 조합하여 설정해 주세요.<br/>

                            * 다른 사이트에서 사용하는 것과 동일하거나 쉬운 비밀번호는 사용하지 마세요. <br/>

                            * 안전한 계정 사용을 위해 비밀번호는 주기적으로 변경해 주세요.<br/>
                            </div>
                <Button
                        backgroundColor="#578E7E" // 초록색
                        textColor="white"
                        width="100%"
                        height="48px"
                        fontSize="16px"
                        onClick={handlepwreplaceOk}
                    >
            완료
            </Button>
            </div>
        </div>
    );
}

export default PwreplacePage;
