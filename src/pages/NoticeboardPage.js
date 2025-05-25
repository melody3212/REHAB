import '../assets/css/write.css';
import Button from '../components/Button.js';
import PictureIcon from '../assets/images/pictureicon.png';
import InputWhiteField from '../components/InputWhiteField.js';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { useState, useRef } from 'react';
import PreviousButton from '../components/PreviousButton.js';
import { boards } from '../api/board';

function ComuwritePage() {
    const navigate = useNavigate();
    const defaultOption = { value: 'community', label: '커뮤니티 게시판' };
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    // 입력 필드 상태
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 이미지 파일 상태 및 파일명 표시
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef();

    // 폼 제출 로직
    const handleSubmit = async () => {
        try {
            // imgUrl은 파일 업로드 후 URL 또는 파일명으로 대체 필요
            const imgUrl = selectedImage ? selectedImage.name : undefined;
            await boards({
                title,
                content,
                boardType: selectedOption.value,
                imgUrl
            });
            navigate('/matchwriteok');
        } catch (error) {
            console.error('게시글 작성 실패:', error.response?.data || error);
            alert('게시글 작성 중 오류가 발생했습니다.');
        }
    };

    const options = [
        { value: 'community', label: '커뮤니티 게시판' },
        { value: 'secondhand', label: '중고거래 게시판' }
    ];

    const customStyles = {
        control: (provided) => ({ ...provided, border: 'none', boxShadow: 'none' }),
        valueContainer: (provided) => ({ ...provided, paddingLeft: 0, paddingRight: 0 }),
        input: (provided) => ({ ...provided, margin: 0 }),
        placeholder: (provided) => ({ ...provided, margin: 0 }),
    };

    // 사진 아이콘 클릭 시 파일 선택 창 열기
    const onPictureClick = () => fileInputRef.current?.click();

    // 파일 선택 시 state에 저장
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedImage(file);
    };

    return (
        <div className="WriteComponent">
            <PreviousButton />
            <div className="writeTop">글쓰기</div>
            <div className="writeButton">
                <Button
                    onClick={() => navigate(-1)}
                    backgroundColor="#578E7E"
                    textColor="white"
                    width="54px"
                    height="27px"
                    fontSize="16px"
                >취소</Button>
                <Button
                    onClick={handleSubmit}
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
                <InputWhiteField
                    type="text"
                    name="write-title"
                    placeholder={
                        selectedOption.value === 'community'
                            ? '제목'
                            : '상품명'
                    }
                    className={
                        selectedOption.value === 'community'
                            ? 'MatchTitle'
                            : 'Matchprice'
                    }
                    placeholderColor="#858585"
                    fontWeight="700"
                    fontSize="20px"
                    color="#858585"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {selectedOption.value === 'secondhand' && <div className="writeLine"></div>}
                {selectedOption.value === 'secondhand' && (
                    <InputWhiteField
                        type="text"
                        name="write-price"
                        placeholder="￦가격"
                        className="Matchprice"
                        placeholderColor="#858585"
                        fontWeight="700"
                        fontSize="20px"
                        color="#858585"
                        onChange={() => {}}
                    />
                )}
                <div className="writeLine"></div>
                <textarea
                    className="MatchContent"
                    placeholder="내용을 입력하세요."
                    style={{ height: selectedOption.value === 'secondhand' ? '81%' : '100%' }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="writeLine"></div>
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
