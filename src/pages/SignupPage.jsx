import '../assets/css/signupPage.css'
import InputField from '../components/InputField';

function SignupPage(){

    return(
        <div className="SignComponent">
            <div className="signupHeader">
                회원가입
            </div>
            <div className="signupForm">
                <div className="signupForm-id">
                    <span className="signupForm-text">아이디</span>
                    <InputField
                        type="text"
                        name="id"
                        placeholder={"아이디 입력(6~20자)"}
                        className="SignupinputField"
                    />

                </div>

                <div className="signupForm-pw">
                    <span className="signupForm-text">패스워드</span>
                    <InputField
                        type="password"
                        name="password"
                        placeholder={"비밀번호 입력(영문, 숫자, 특수문자 포함 8~20자)"}
                        className="SignupinputField"
                    />

                </div>

                <div className="signupForm-pwck">
                    <span className="signupForm-text">비밀번호 확인</span>
                    <InputField
                        type="password"
                        name="passwordcheck"
                        placeholder={"비밀번호 재입력"}
                        className="SignupinputField"
                    />

                </div>

                <div className="signupForm-name">
                    <span className="signupForm-text">이름</span>
                    <InputField
                        type="text"
                        name="name"
                        placeholder={"이름을 입력해주세요."}
                        className="SignupinputField"
                    />

                </div>

                <div className="signupForm-number">
                    <span className="signupForm-text">전화번호</span>
                    <InputField
                        type="text"
                        name="number"
                        placeholder={"휴대폰 번호 입력(‘-’ 제외 11자리 입력)"}
                        className="SignupinputField"
                    />

                </div>

                
                <div className="signupForm-email">
                    <span className="signupForm-text">이메일 주소</span>
                    <InputField
                        type="text"
                        name="number"
                        placeholder={"이메일 주소"}
                        className="SignupinputField"
                    />

                </div>

                
                <div className="signupForm-birthdate">
                    <span className="signupForm-text">생년월일</span>
                    <InputField
                        type="text"
                        name="number"
                        placeholder={""}
                        className="SignupinputField"
                    />

                </div>


            </div>

        </div>

    );


}

export default SignupPage;