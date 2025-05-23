import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Link 임포트
import '../assets/css/matchBoard.css';
import '../assets/css/board.css';
import SearchIcon from '../assets/images/searchicon.png';
import InputWhiteField from '../components/InputWhiteField';
import Button from '../components/Button';
import mockData from '../api/mock-deal.json'; // JSON 파일 경로
import { useNavigate } from 'react-router-dom';

function DealboardPage() {
    const [posts, setPosts] = useState([]); // 게시글 상태 정의
    const [loading, setLoading] = useState(true); // 로딩 상태 정의

    const navigate = useNavigate();

    const handleSubmit = () => {
        // 제출 로직 작성
        console.log('폼 제출');
    };

    const handleMComuwrite = () => {
        handleSubmit(); // 제출 로직 실행
        navigate('/comuwrite'); // '/comuwrite'로 라우팅
    };

    useEffect(() => {
        const fetchPosts = () => {
            try {
                setPosts(mockData); // 불러온 데이터로 상태 업데이트
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchPosts(); // 데이터 불러오기 함수 호출
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 호출

    if (loading) {
        return <div>Loading...</div>; // 로딩 중 표시
    }

    return (
        <div className="BoardComponent">
            <div className="writeTop">
                중고거래
            </div>
            <div className='writeMid'>
                <div className='search'>
                    <div className='search-main'>
                        <img src={SearchIcon} alt="Search Icon" className="searchIcon" />
                        <InputWhiteField
                            type="text"
                            name="board-search"
                            placeholder={"검색하기"}
                            className="board-search"
                            fontSize="15px"
                        />
                    </div>
                    <div className='search-line'> </div>
                </div>
                
                <div className='matchButton'>
                    <Button                       
                        backgroundColor="#578E7E" // 초록색
                        textColor="white"
                        width="79px"
                        height="36px"
                        onClick={handleMComuwrite}>
                        글쓰기
                    </Button>
                </div>
            </div>

            <div className='dealpost'>
                {posts.map((post) => (
                    <Link to={`/dealboard/${post.id}`} key={post.id} className="deal-board">
                        <div className='deal-box'>
                            <img src={post['content-photo']} alt="Content" className="deal-photo" />
                            <div className="deal-price">{post.price}</div>
                            <div className="deal-title">{post.title}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default DealboardPage;
