import '../assets/css/okPage.css';
import CheckIcon from '../assets/images/checkicon.svg';
import Button from '../components/Button';

function SignupokPage(){

    return(
        <div className='SignOkComponent'>

            <div className="SignOkTop">
                <div className="SignIcon">
                    <img src={CheckIcon} alt="Check Icon" />
                </div>
                리헙 가입 성공!

            </div>

            <div className='SignDown'>
            <Button
                        backgroundColor="#578E7E" // 초록색
                        textColor="white"
                        width="100%"
                        height="48px"

                        
                    >
            서비스 시작하기
            </Button>
            </div>

        </div>

    );


}

export default SignupokPage;