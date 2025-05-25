import '../assets/css/write.css';
import Button from '../components/Button.js';
import PictureIcon from '../assets/images/pictureicon.png';
import InputWhiteField from '../components/InputWhiteField.js';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { useState, useRef } from 'react';
import MatchbackButton from '../components/MatchbackButton.js';

function ComuwritePage() {
    const navigate = useNavigate();
    const defaultOption = { value: 'FREE', label: '커뮤니티 게시판' };
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    // 이미지 파일 상태 및 파일명 표시
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef();

    const handleSubmit = () => {
        // 제출 로직 작성: selectedImage와 함께 서버로 전송
        console.log('폼 제출, 선택된 이미지:', selectedImage);
    };

    const handleMatchOk = () => {
        handleSubmit(); // 제출 로직 실행
        navigate('/matchwriteok'); // '/matchwriteok'으로 라우팅
    };

    const options = [
        { value: 'FREE', label: '커뮤니티 게시판' },
        { value: 'MARKET', label: '중고거래 게시판' }
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

    // 사진 아이콘 클릭 시 파일 선택 창 열기
    const onPictureClick = () => {
        fileInputRef.current?.click();
    };

    // 파일 선택 시 state에 저장
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    return (
        <div className="WriteComponent">
            <MatchbackButton />
            <div className="writeTop">글쓰기</div>
            <div className="writeButton">
                <Button
                    onClick={handleSubmit}
                    backgroundColor="#578E7E"
                    textColor="white"
                    width="54px"
                    height="27px"
                    fontSize="16px"
                >취소</Button>
                <Button
                    onClick={handleMatchOk}
                    backgroundColor="#578E7E"
                    textColor="white"
                    width="54px"
                    height="27px"
                    fontSize="16px"
                >업로드</Button>
            </div>

            <div className="writeInput">
                <Select
                    options={options}
                    placeholder="게시판 선택"
                    styles={customStyles}
                    className="Comu-SelectBox"
                    value={selectedOption}
                    onChange={setSelectedOption}
                />
                <div className="writeLine"></div>
                {selectedOption.value === 'FREE' && (
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
                {selectedOption.value === 'MARKET' && (
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
                        height: selectedOption.value === 'MARKET' ? '81%' : '100%'
                    }}
                ></textarea>
                <div className="writeLine"></div>
                {/* 파일명 표시를 위해 flex 적용 */}
                <div className="writeDown" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={PictureIcon}
                        className="pictureicon"
                        alt="Picture Icon"
                        style={{ cursor: 'pointer' }}
                        onClick={onPictureClick}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {selectedImage && (
                        <span style={{ marginLeft: '8px', fontSize: '14px', color: '#333' }}>
                            {selectedImage.name}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ComuwritePage;
