import React from 'react';
import { useParams } from 'react-router-dom';
import mockData from '../api/mock-comu.json'; // JSON 파일 경로
import ChatIcon from '../assets/images/chaticon.png';
import '../assets/css/board.css';
import PreviousButton from '../components/PreviousButton';

function ComuqnaPage() {
    const { id } = useParams(); // URL에서 ID 가져오기
    const post = mockData.find(post => post.id === parseInt(id)); // ID에 해당하는 게시글 찾기

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0'); // 분을 두 자리로 맞추기

        return `${month}/${day} ${hours}:${minutes}`;
    };

    return (
        <div className="BoardComponent">
            <PreviousButton />
            <div className="writeTop">매칭 게시판</div>
            <div className="writeMid">
                <div className="userinfo">
                    {post ? (
                        <>
                            <img 
                                src={post.writer.profile.photo} // 사용자 사진
                                alt={`${post.writer.name}의 프로필 사진`} 
                                className="user-photo" 
                            />
                            <span className="writertext">
                                {post.writer.name}
                                <br />
                                {formatDate(post.updatedAt)}
                            </span>
                        </>
                    ) : (
                        <p>게시글을 찾을 수 없습니다.</p>
                    )}
                </div>
                <img src={ChatIcon} alt="Chat Icon" className="chatIcon" />
            </div>

            {post && (
                <div className="writecontent">
                    {post['content-photo'] && (
                        <img 
                            src={post['content-photo']} 
                            alt="Content Photo" 
                            className="detail-photo" 
                        />
                    )}
                    <div className="matchdetail-title">{post.title}</div>
                    <p className="matchdetail-content">{post.content}</p>
                    <div className="matchline"> </div>

       
                    
                </div>
            )}
        </div>
    );
}

export default ComuqnaPage;
