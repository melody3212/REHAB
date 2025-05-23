import '../assets/css/okPage.css';
import CheckIcon from '../assets/images/checkicon.svg';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function PwreplacepokPage(){

    const navigate = useNavigate();

    const handlemain = () => {
        // 제출 로직 작성
        console.log('폼 제출');
        navigate('/');
    };

    return(
        <div className='SignOkComponent'>

            <div className="SignOkTop">
                <div className="SignIcon">
                    <img src={CheckIcon} alt="Check Icon" />
                </div>
                비밀번호 재설정 성공!

            </div>

            <div className='SignDown'>
            <Button
                        backgroundColor="#578E7E" // 초록색
                        textColor="white"
                        width="100%"
                        height="48px"
                        onClick={handlemain}
                        
                    >
            로그인으로 돌아가기
            </Button>
            </div>

        </div>

    );


}

export default PwreplacepokPage;