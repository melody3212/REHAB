import '../assets/css/write.css';
import Button from '../components/Button.js';
import PictureIcon from '../assets/images/pictureicon.png';
import InputWhiteField from '../components/InputWhiteField.js';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useState, useRef } from 'react';
import PreviousButton from '../components/PreviousButton.js';
import { boards } from '../api/board';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

function ComuwritePage() {
  const navigate = useNavigate();
  const OPTIONS = [
    { value: 'FREE', label: '커뮤니티 게시판' },
    { value: 'SECONDHAND', label: '중고거래 게시판' }
  ];

  const [selectedOption, setSelectedOption] = useState(OPTIONS[0]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  // 1) presigned URL 발급 (GET) - S3 컨트롤러 사용
  const getPresignedUrl = async (type, fileName) => {
    const authHeader = localStorage.getItem('authToken') || '';
    const [, jwt] = authHeader.split(' ');
    const response = await axios.get(
      `${API_BASE_URL}/api/files/upload-url/${type}`,
      {
        params: { filename: fileName },
        headers: { Authorization: `Bearer ${jwt}` }
      }
    );
    // response.data.data: { presignedUrl, accessUrl, key }
    return response.data.data;
  };

  // 2) S3 PUT 업로드
  const uploadToS3 = async (uploadUrl, file) => {
    await axios.put(uploadUrl, file, {
      headers: { 'Content-Type': file.type }
    });
  };

  const handleSubmit = async () => {
    try {
      let imgUrl;
      if (selectedImage) {
        // presigned URL 요청 (type: 게시글 이미지)
        const { presignedUrl, accessUrl } = await getPresignedUrl('board', selectedImage.name);
        // S3에 PUT으로 업로드
        await uploadToS3(presignedUrl, selectedImage);
        // 화면에 사용할 이미지 URL
        imgUrl = accessUrl;
      }

      // 게시글 작성 API 호출 (이미지 URL 포함)
      const payload = {
        title,
        content: selectedOption.value === 'SECONDHAND'
          ? `${content}\n\n가격: ₩${price}`
          : content,
        boardType: selectedOption.value,
        imgUrl
      };

      await boards(payload);
      navigate('/comuwriteok');
    } catch (err) {
      console.error('게시글 작성 실패:', err.response?.data || err);
      alert(err.response?.data?.message || '게시글 작성 중 오류가 발생했습니다.');
    }
  };

  const onPictureClick = () => fileInputRef.current?.click();
  const handleFileChange = e => setSelectedImage(e.target.files[0]);

  const customStyles = {
    control: provided => ({ ...provided, border: 'none', boxShadow: 'none' }),
    valueContainer: provided => ({ ...provided, paddingLeft: 0, paddingRight: 0 }),
    input: provided => ({ ...provided, margin: 0 }),
    placeholder: provided => ({ ...provided, margin: 0 })
  };

  return (
    <div className="WriteComponent">
      <PreviousButton />
      <div className="writeTop">글쓰기</div>
      <div className="writeButton">
        <Button onClick={() => navigate(-1)} backgroundColor="#578E7E" textColor="white" width="54px" height="27px" fontSize="16px">취소</Button>
        <Button onClick={handleSubmit} backgroundColor="#578E7E" textColor="white" width="54px" height="27px" fontSize="16px">업로드</Button>
      </div>
      <div className="writeInput">
        <Select
          options={OPTIONS}
          placeholder="게시판 선택"
          styles={customStyles}
          className="Comu-SelectBox"
          value={selectedOption}
          onChange={setSelectedOption}
        />
        <div className="writeLine" />
        <InputWhiteField
          type="text"
          name="write-title"
          placeholder={selectedOption.value === 'FREE' ? '제목' : '상품명'}
          className={selectedOption.value === 'FREE' ? 'ComuTitle' : 'Matchprice'}
          placeholderColor="#858585"
          fontWeight="700"
          fontSize="20px"
          color="#858585"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {selectedOption.value === 'SECONDHAND' && (
          <>
            <div className="writeLine" />
            <InputWhiteField
              type="text"
              name="write-price"
              placeholder="￦가격"
              className="Matchprice"
              placeholderColor="#858585"
              fontWeight="700"
              fontSize="20px"
              color="#858585"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </>
        )}
        <div className="writeLine" />
        <textarea
          className="MatchContent"
          placeholder="내용을 입력하세요."
          style={{ height: selectedOption.value === 'SECONDHAND' ? '81%' : '100%' }}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="writeLine" />
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
