import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../assets/css/matchBoard.css';
import '../assets/css/board.css';
import SearchIcon from '../assets/images/searchicon.png';
import InputWhiteField from '../components/InputWhiteField';
import Button from '../components/Button';
import PreviousButton from '../components/PreviousButton';
import MatchBackButton from '../components/MatchbackButton';
import { searchBoards } from '../api/board';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
const FREE_TYPE = 'FREE';
const ITEMS_PER_PAGE = 5;

function ComuboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  // 전체 FREE 타입 게시글 조회
  const fetchFreePosts = async () => {
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
      const freePosts = allPosts.filter(post => post.boardType === FREE_TYPE);
      freePosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setPosts(freePosts);
      setPage(0);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreePosts();
  }, []);

  // 검색 처리
  const handleSearch = async () => {
    setLoading(true);
    try {
      if (!keyword.trim()) {
        await fetchFreePosts();
        return;
      }
      const res = await searchBoards(keyword);
      const allResults = res.data || [];
      const filtered = allResults.filter(post => post.boardType === FREE_TYPE);
      filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setPosts(filtered);
      setPage(0);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = ({ selected }) => setPage(selected);
  const handleWrite = () => navigate('/comuwrite');

  if (loading) return <div>Loading...</div>;

  const offset = page * ITEMS_PER_PAGE;
  const currentPosts = posts.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(posts.length / ITEMS_PER_PAGE);

  return (
    <div className="BoardComponent">
      <MatchBackButton />
      <div className="writeTop">커뮤니티</div>
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
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="search-line" />
        </div>
        <div className="matchButton">
          <Button
            backgroundColor="#578E7E"
            textColor="white"
            width="79px"
            height="36px"
            onClick={handleWrite}
          >글쓰기</Button>
        </div>
      </div>

      <div className="matchpost">
        {currentPosts.map(post => (
          <Link
            to={`/comuboard/${post.boardId}`}
            key={post.boardId}
            className="match-box custom-link"
          >
            <h2 className="matchpost-title">{post.title}</h2>
            {post.imgUrl && (
              <div className="post-content">
                <img src={post.imgUrl} alt="Content" className="content-photo" />
              </div>
            )}
            <p className="matchpost-content">{post.content}</p>
            <div className="postline" />
          </Link>
        ))}
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          pageCount={pageCount}
          forcePage={page}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />
      )}
    </div>
  );
}

export default ComuboardPage;
