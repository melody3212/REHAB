import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/matchBoard.css';
import '../assets/css/board.css';
import SearchIcon from '../assets/images/searchicon.png';
import InputWhiteField from '../components/InputWhiteField';
import Button from '../components/Button';
import MatchBackButton from '../components/MatchbackButton';
import PreviousButton from '../components/PreviousButton';
import { searchBoards } from '../api/board';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
const MATCHING_TYPE = 'MATCHING';

function MatchBoardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  const fetchMatchingPosts = async () => {
    setLoading(true);
    try {
      const authHeader = localStorage.getItem('authToken');
      if (!authHeader) throw new Error('No auth token');
      const [, jwt] = authHeader.split(' ');
      const response = await axios.get(
        `${API_BASE_URL}/api/boards`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      const allPosts = response.data.data || [];
      const filtered = allPosts.filter(
        (post) => post.boardType === MATCHING_TYPE
      );
      const sorted = filtered
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

      setPosts(sorted);
    } catch (error) {
      console.error('Error fetching matching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchingPosts();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (!keyword.trim()) {
        await fetchMatchingPosts();
        return;
      }
      const res = await searchBoards(keyword);
      const allResults = res.data || [];
      const filtered = allResults.filter(
        (post) => post.boardType === MATCHING_TYPE
      );
      const sorted = filtered
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setPosts(sorted);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="BoardComponent">
      <MatchBackButton />
      <div className="writeTop">매칭 게시판</div>
      <div className="writeMid">
        <div className="search">
          <div className="search-main">
            <img
              src={SearchIcon}
              alt="Search Icon"
              className="searchIcon"
              style={{ cursor: 'pointer' }}
              onClick={handleSearch}
            />
            <InputWhiteField
              type="text"
              name="board-search"
              placeholder="검색하기"
              className="board-search"
              fontSize="15px"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
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