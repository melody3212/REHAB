import '../assets/css/write.css';
import Button from '../components/Button';
import InputWhiteField from '../components/InputWhiteField.js';
import { useNavigate } from 'react-router-dom';
import { boards } from '../api/board';
import React, { useState } from 'react';
import PreviousButton from '../components/PreviousButton.js';

function MatchwritePage() {

const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardType, setboardType] = useState("MATCHING");

    const handleSubmit = () => {
        // 제출 로직 작성
        console.log('폼 제출');
    };


      const handleMatchOk = async (e) => {
        e.preventDefault();
        try {
          await boards({ title, content, boardType });
          // 로그인 성공 시, 메인 페이지로 이동
          navigate('/matchwriteok');
        } catch (error) {
          console.error(error);
          alert(
            `글쓰기 실패: ${error.response?.data?.message || error.message}`
          );
        }
      };

    return (
        <div className="WriteComponent">
          <PreviousButton />
            <div className="writeTop">
                글쓰기
            </div>
            <div className='writeButton'>
                <Button
                    
                    backgroundColor="#578E7E" // 초록색
                    textColor="white"
                    width="54px"
                    height='27px'
                    fontSize='16px'
                    onClick={() => navigate(`/matchboard`)}
                >
                    취소
                </Button>
                <Button
                    onClick={handleMatchOk} // 업로드 버튼 클릭 시
                    backgroundColor="#578E7E"
                    textColor="white"
                    width="54px"
                    height='27px'
                    fontSize='16px'
                >
                    업로드
                </Button>   
            </div>
            <div className='writeLine'></div>

            <div className='writeInput'>
                <InputWhiteField
                                type="text"
                                name="write-title"
                                placeholder={"제목 작성하기"}
                                className="MatchTitle"

                                placeholderColor="#858585"
                                fontWeight="700"
                                fontSize="20px"
                                color="#858585"

                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />


        <textarea
          className="MatchContent"
          placeholder="내용 작성하기"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

            </div>
        </div>
    );
}

export default MatchwritePage;
