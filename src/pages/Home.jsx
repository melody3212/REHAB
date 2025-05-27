// 📁 src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';

import Calendar from '../components/Calendar';
import Profile from '../components/Profile';
import Walking from '../components/Walking';
import TodaySchedule from "../components/TodaySchedule";

import scheduleIcon from "../assets/images/schedule.png";
import exerciserecordIcon from "../assets/images/exerciserecord.png";
import cbtIcon from "../assets/images/cbt.png";
import Button1 from '../components/Button1';
import matchComIcon from "../assets/images/match_com.png";        // ← import!
import userComIcon from "../assets/images/user_com.png";    


const Home = ({ schedules, checkedStates, setCheckedStates }) => {
  const nav = useNavigate();

  // ✅ 체크 상태 변경 핸들러
  const handleCheckboxChange = (scheduleId, itemIndex) => {
    setCheckedStates((prev) => {
      const prevChecked = prev[scheduleId] || [];
      const updated = [...prevChecked];
      updated[itemIndex] = !updated[itemIndex];
      return { ...prev, [scheduleId]: updated };
    });
  };

  return (
    <div className="container">
      <div className="logout">
        <Button1 
          text={"로그아웃"}
          type={"profile"}
          onClick={() => nav(`/`)}
        />
      </div>

      <div className="info">
        <Profile />
      </div>

      <div className="top">
        <div className="schedule">
          <TodaySchedule
            schedules={schedules}
            checkedStates={checkedStates}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>

        <div className="steps">
          <Walking />
        </div>
      </div>

      <div className="community">
        <div className="match_com">
          <img
            className="com_img"
            src={matchComIcon}
            alt="간병인 커뮤니티"
          />
          <Button1 
            text={"간병인 매칭 게시판"}
            type={"community"}
            onClick={() => nav(`/matchboard`)}
          />
        </div>

        <div className="user_com">
          <img
            className="com_img"
            src={userComIcon}
            alt="유저 커뮤니티"
          />
          <Button1 
            text={"유저 커뮤니티 게시판"}
            type={"community"}
            onClick={() => nav(`/noticeboard`)}
          />
        </div>
      </div>

      <div className="quick-links">
        <Button1 
          text={"스케줄 관리"}
          type={"basic"}
          icon={scheduleIcon}
          onClick={() => nav(`/schedule`)}
        />
        <Button1 
          text={"재활운동기록"}
          type={"basic"}
          icon={exerciserecordIcon}
          onClick={() => nav(`/exercise`)}
        />
        <Button1 
          text={"인지행동치료"}
          type={"basic"}
          icon={cbtIcon}
          onClick={() => nav(`/cbt`)}
        />
      </div>

      <div className="calendar">
        <Calendar />
      </div>
    </div>
  );
};

export default Home;
