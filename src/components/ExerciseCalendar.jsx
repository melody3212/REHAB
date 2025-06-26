import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Calendar.css";

const ExerciseCalendar = ({ allExercise, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const getDaysInMonth    = (y,m) => new Date(y,m+1,0).getDate();
  const getFirstDayOfMonth= (y,m) => new Date(y,m,1).getDay();

  const handleDateClick = (day) => {
    const year  = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const d2    = day.toString().padStart(2,"0");
    const m2    = month.toString().padStart(2,"0");
    const dateId = `${year}-${m2}-${d2}`;

    // 1) 페이지 이동
    navigate(`/exercise/${dateId}`, {
      state: { allExercise }
    });

    // 2) 콜백이 필요하면 호출
    if (onDateClick) onDateClick(dateId);
  };

  const generateCalendar = () => {
    const year       = currentDate.getFullYear();
    const month      = currentDate.getMonth();
    const daysInMonth= getDaysInMonth(year,month);
    const firstDay   = getFirstDayOfMonth(year,month);
    const today      = new Date();
    const isThisMonth= today.getFullYear() === year && today.getMonth() === month;
    const weeks      = [];
    let   week       = [];

    // 요일 헤더
    weeks.push(
      <div className="week header" key="header">
        {["일","월","화","수","목","금","토"].map((wd,i) => (
          <div className="day header" key={i}>{wd}</div>
        ))}
      </div>
    );

    // 빈 칸 채우기
    for (let i=0;i<firstDay;i++) {
      week.push(<div className="day empty" key={`empty-${i}`} />);
    }

    // 날짜 채우기
    for (let d=1; d<=daysInMonth; d++) {
      let cls = "day";
      const idx = (firstDay + d - 1) % 7;
      if (idx === 0) cls += " holiday";
      if (idx === 6) cls += " saturday";
      if (isThisMonth && today.getDate() === d) cls += " today";

      week.push(
        <div className={cls} key={d} onClick={()=>handleDateClick(d)}>
          {d}
        </div>
      );

      // 주 단위로 묶기
      if ((firstDay + d) % 7 === 0) {
        weeks.push(<div className="week" key={`week-${weeks.length}`}>{week}</div>);
        week = [];
      }
    }

    // 마지막 주 빈 칸 채우기
    while (week.length < 7) {
      week.push(<div className="day empty" key={`last-empty-${week.length}`} />);
    }
    weeks.push(<div className="week" key={`week-${weeks.length}`}>{week}</div>);

    return weeks;
  };

  return (
    <div className="calendar-container">
      <header>
        <button className="calendar_button" onClick={()=>setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1))}>
          &lt;
        </button>
        <h3>{currentDate.getFullYear()}년 {currentDate.toLocaleString("default",{month:"long"})}</h3>
        <button className="calendar_button" onClick={()=>setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1))}>
          &gt;
        </button>
      </header>
      <div className="calendar">{generateCalendar()}</div>
    </div>
  );
};

export default ExerciseCalendar;
