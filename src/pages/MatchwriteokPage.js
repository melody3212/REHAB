import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/okPage.css';
import CheckIcon from '../assets/images/checkicon.svg';
import Button from '../components/Button';
import PreviousButton from '../components/PreviousButton';

function MatchwriteokPage() {
  return (
    <div className='SignOkComponent'>
      
      <div className="SignOkTop">
        <div className="SignIcon">
          <img src={CheckIcon} alt="Check Icon" />
        </div>
        업로드 성공!
      </div>

      <div className='SignDown'>
        <Link to="/matchboard" className="custom-link">
          <Button
            backgroundColor="#578E7E"
            textColor="white"
            width="100%"
            height="48px"
          >
            게시판으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MatchwriteokPage;