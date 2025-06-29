import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, Dropdown } from 'antd';
import Commentmenu from '../assets/images/comment-menu.png';
import ChatIcon from '../assets/images/chaticon.png';
import DeleteIcon from '../assets/images/deleteicon.png';
import DefaultProfile from '../assets/images/default-profile.png';
import '../assets/css/board.css';
import '../assets/css/comment.css';
import '../assets/css/popup.css';
import PreviousButton from '../components/PreviousButton';
import Deletepopup from '../components/Deletepopup';
import Comment from '../components/Comment';
import { comments as postComment, deleteComment, deleteBoard } from '../api/board';
import MatchBackButton from '../components/MatchbackButton';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

function ComuqnaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const authHeader = localStorage.getItem('authToken') || '';
        const [, jwt] = authHeader.split(' ');
        const postRes = await axios.get(
          `${API_BASE_URL}/api/boards/${id}`,
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
        setPost(postRes.data.data);

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

  const handleCommentEdit = (commentId) => {
    console.log('Edit comment', commentId);
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const authHeader = localStorage.getItem('authToken') || '';
      const [, jwt] = authHeader.split(' ');
      await deleteComment(Number(id), commentId);
      const res = await axios.get(
        `${API_BASE_URL}/api/boards/${id}/comments`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setCommentsList(res.data.data || []);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handlePostDelete = () => {
    setShowDeletePopup(true);
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="BoardComponent">
      <MatchBackButton />
      <div className="writeTop">커뮤니티</div>
      <div className="writeMid">
        <div className="userinfo">
          <img
            src={post.imgUrl || DefaultProfile}
            alt={`${post.username} 프로필`}
            className="user-photo"
            onError={(e) => { e.currentTarget.src = DefaultProfile; }}
          />
          <span className="writertext">
            {post.username}
            <br />
            {new Date(post.updatedAt).toLocaleString()}
          </span>
        </div>
        <div className="flexbox">
          <img src={ChatIcon} alt="Chat Icon" className="chatIcon" />
          <img
            src={DeleteIcon}
            alt="게시글 삭제"
            className="chatIcon"
            style={{ cursor: 'pointer' }}
            onClick={handlePostDelete}
          />
        </div>
      </div>

      <div className="writecontent">
        {post.imgUrl && (
          <img src={post.imgUrl} alt="Content" className="detail-photo" />
        )}
        <div className="matchdetail-title">{post.title}</div>
        <p className="matchdetail-content">{post.content}</p>
        <div className="matchline" />

        <div className="comments-section">
          {commentsList.length > 0 ? (
            commentsList.map((comment) => {
              const dropdownMenu = (
                <Menu>
                  <Menu.Item key="edit" onClick={() => handleCommentEdit(comment.id)}>
                    수정
                  </Menu.Item>
                  <Menu.Item key="delete" onClick={() => handleCommentDelete(comment.id)}>
                    삭제
                  </Menu.Item>
                </Menu>
              );
              return (
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
                    <Dropdown overlay={dropdownMenu} trigger={['click']} placement="bottomRight">
                      <img
                        src={Commentmenu}
                        alt="코멘트 메뉴"
                        className="comment-menu"
                        style={{ cursor: 'pointer' }}
                      />
                    </Dropdown>
                  </div>
                  <div className="comment-endline" />
                </div>
              );
            })
          ) : (
            <p></p>
          )}
        </div>
      </div>

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

      {showDeletePopup && (
        <>
          <div className="popup-overlay" onClick={() => setShowDeletePopup(false)} />
          <Deletepopup
            onCancel={() => setShowDeletePopup(false)}
            onConfirm={async () => {
              try {
                const boardId = Number(id);
                for (const c of commentsList) {
                  await deleteComment(boardId, c.id);
                }
                await deleteBoard(boardId);
                navigate('/comuboard');
              } catch (err) {
                console.error('Error deleting comments or post:', err.response?.data || err);
                alert('삭제 중 오류가 발생했습니다.');
              }
            }}
          />
        </>
      )}
    </div>
  );
}

export default ComuqnaPage;