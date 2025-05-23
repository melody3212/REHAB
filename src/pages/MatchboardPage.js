// src/pages/MatchBoardPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/matchBoard.css';
import '../assets/css/board.css';
import SearchIcon from '../assets/images/searchicon.png';
import InputWhiteField from '../components/InputWhiteField';
import Button from '../components/Button';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

function MatchBoardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const authHeader = localStorage.getItem('authToken');
        const [, jwt] = authHeader.split(' ');
        const response = await axios.get(
          `${API_BASE_URL}/api/boards`,
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
        // 최신 글이 위로 오도록 updatedAt 기준 내림차순 정렬
        const sorted = response.data.data
          .slice()  // 원본 배열 보호
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setPosts(sorted);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="BoardComponent">
      <div className="writeTop">매칭 게시판</div>
      <div className="writeMid">
        <div className="search">
          <div className="search-main">
            <img src={SearchIcon} alt="Search Icon" className="searchIcon" />
            <InputWhiteField
              type="text"
              name="board-search"
              placeholder="검색하기"
              className="board-search"
              fontSize="15px"
            />
          </div>
          <div className="search-line" />
        </div>
        <div className="matchButton">
          <Link to="/matchwrite" className="custom-link">
            <Button
              backgroundColor="#578E7E"
              textColor="white"
              width="79px"
              height="36px"
            >
              글쓰기
            </Button>
          </Link>
        </div>
      </div>

      <div className="matchpost">
        {posts.map((post) => (
          <Link
            to={`/matchboard/${post.boardId}`}
            key={post.boardId}
            className="match-box custom-link"
          >
            <h2 className="matchpost-title">{post.title}</h2>
            <p className="matchpost-content">{post.content}</p>
            <div className="postline" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MatchBoardPage;
