import '../assets/css/write.css';
import Button from '../components/Button.js';
import PictureIcon from '../assets/images/pictureicon.png';
import InputWhiteField from '../components/InputWhiteField.js';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { useState } from 'react';
import PreviousButton from '../components/PreviousButton.js';

function ComuwritePage() {
    const navigate = useNavigate();
    const defaultOption = { value: 'community', label: '커뮤니티 게시판' };
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    const handleSubmit = () => {
        // 제출 로직 작성
        console.log('폼 제출');
    };

    const handleMatchOk = () => {
        handleSubmit(); // 제출 로직 실행
        navigate('/matchwriteok'); // '/matchwriteok'으로 라우팅
    };

    const options = [
        { value: 'community', label: '커뮤니티 게시판' },
        { value: 'secondhand', label: '중고거래 게시판' }
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none',
            boxShadow: 'none',
        }),
        valueContainer: (provided) => ({
            ...provided,
            paddingLeft: 0,
            paddingRight: 0,
        }),
        input: (provided) => ({
            ...provided,
            margin: 0,
        }),
        placeholder: (provided) => ({
            ...provided,
            margin: 0,
        }),
    };

    return (
        <div className="WriteComponent">
            <PreviousButton />
            <div className="writeTop">
                글쓰기
            </div>
            <div className="writeButton">
                <Button
                    onClick={handleSubmit} // 취소 버튼 클릭 시
                    backgroundColor="#578E7E" // 초록색
                    textColor="white"
                    width="54px"
                    height="27px"
                    fontSize="16px"
                >
                    취소
                </Button>
                <Button
                    onClick={handleMatchOk} // 업로드 버튼 클릭 시
                    backgroundColor="#578E7E"
                    textColor="white"
                    width="54px"
                    height="27px"
                    fontSize="16px"
                >
                    업로드
                </Button>
            </div>
            
            <div className="writeInput">
                <Select 
                    options={options}
                    placeholder="게시판 선택"
                    styles={customStyles}
                    className="Comu-SelectBox"
                    value={selectedOption} // 기본값 지정
                    onChange={setSelectedOption}  // 선택 값 업데이트
                />
                <div className="writeLine"></div>
                {selectedOption && selectedOption.value === 'community' && (
                    <InputWhiteField
                        type="text"
                        name="write-title"
                        placeholder="제목"
                        className="MatchTitle"
                        placeholderColor="#858585"
                        fontWeight="700"
                        fontSize="20px"
                        color="#858585"
                    />
                )}
                {selectedOption && selectedOption.value === 'secondhand' && (
                    <>
                        <InputWhiteField
                            type="text"
                            name="write-price"
                            placeholder="상품명"
                            className="Matchprice"
                            placeholderColor="#858585"
                            fontWeight="700"
                            fontSize="20px"
                            color="#858585"
                        />
                        <div className="writeLine"></div>
                        <InputWhiteField
                            type="text"
                            name="write-price"
                            placeholder="￦가격"
                            className="Matchprice"
                            placeholderColor="#858585"
                            fontWeight="700"
                            fontSize="20px"
                            color="#858585"
                        />
                    </>
                )}
                <div className="writeLine"></div>
                <textarea
                    className="MatchContent"
                    placeholder="내용을 입력하세요."
                    style={{
                        height: selectedOption && selectedOption.value === 'secondhand' ? '81%' : '100%'
                    }}
                ></textarea>
                <div className="writeLine"></div>
                <div className="writeDown">
                    <img src={PictureIcon} className="pictureicon" alt="Picture Icon" />
                </div>
            </div>
        </div>
    );
}

export default ComuwritePage;
