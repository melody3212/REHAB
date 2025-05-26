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

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
const FREE_TYPE = 'FREE';
const ITEMS_PER_PAGE = 5;

function ComuboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
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
        // 최신 순 정렬
        freePosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setPosts(freePosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFreePosts();
  }, []);

  const handlePageChange = ({ selected }) => setPage(selected);

  if (loading) return <div>Loading...</div>;

  const offset = page * ITEMS_PER_PAGE;
  const currentPosts = posts.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const handleWrite = () => navigate('/comuwrite');

  return (
    <div className="BoardComponent">
      <PreviousButton />
      <div className="writeTop">커뮤니티</div>
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
          <Link to={`/comuboard/${post.boardId}`} key={post.boardId} className="match-box custom-link">
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


    </div>
  );
}

export default ComuboardPage;
