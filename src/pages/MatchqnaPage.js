// === src/pages/MatchqnaPage.jsx ===
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatIcon from '../assets/images/chaticon.png';
import DefaultProfile from '../assets/images/default-profile.png';
import '../assets/css/board.css';
import '../assets/css/comment.css';
import Comment from '../components/Comment';
import { comments as postComment } from '../api/board';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

function MatchqnaPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');

  // 게시글 및 댓글 불러오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const authHeader = localStorage.getItem('authToken') || '';
        const [, jwt] = authHeader.split(' ');

        // 게시글 데이터
        const postRes = await axios.get(
          `${API_BASE_URL}/api/boards/${id}`,
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
        setPost(postRes.data.data);

        // 댓글 리스트
        const commentRes = await axios.get(
          `${API_BASE_URL}/api/boards/${id}/comments`,
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
        setCommentsList(commentRes.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  // 댓글 제출 및 목록 재조회
  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    try {
      await postComment({ boardId: Number(id), content: commentContent });
      setCommentContent('');
      const authHeader = localStorage.getItem('authToken') || '';
      const [, jwt] = authHeader.split(' ');
      const commentRes = await axios.get(
        `${API_BASE_URL}/api/boards/${id}/comments`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setCommentsList(commentRes.data.data || []);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="BoardComponent">
      <div className="writeTop">매칭 게시판</div>
      <div className="writeMid">
        <div className="userinfo">
          <img
            src={post.imgUrl || DefaultProfile}
            alt={`${post.username} 프로필`}
            className="user-photo"
            onError={(e) => { e.currentTarget.src = DefaultProfile; }}
          />
          <span className="writertext">
            {post.username}<br />
            {new Date(post.updatedAt).toLocaleString()}
          </span>
        </div>
        <img src={ChatIcon} alt="Chat Icon" className="chatIcon" />
      </div>

      <div className="writecontent">
        <div className="matchdetail-title">{post.title}</div>
        <p className="matchdetail-content">{post.content}</p>
        <div className="matchline" />

        {/* 댓글 목록 */}
        <div className="comments-section">
          {commentsList.length > 0 ? (
            commentsList.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-user-profile">
                  <img
                    src={DefaultProfile}
                    alt={`${comment.username} 프로필`}
                    className="comment-user-photo"
                  />
                  <div>
                    <span className="commenter-name">{comment.username}</span>
                  </div>
                  <div className="comment-midline" />
                  <p className="comment-content">{comment.content}</p>
                </div>
                <div className="comment-endline" />
              </div>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 댓글 입력 영역: writecontent 외부에 배치 */}

        <Comment
          id="comment"
          name="comment"
          value={commentContent}
          onChange={handleCommentChange}
          onSubmit={handleCommentSubmit}
          placeholder="댓글을 입력하세요."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleCommentSubmit();
            }
          }}
        />

    </div>
  );
}

export default MatchqnaPage;
