// ✅ components/ExerciseCalendar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Calendar.css";

const ExerciseCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 1월부터 시작
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    const dateId = `${year}-${formattedMonth}-${formattedDay}`;

    navigate(`/exercise/${dateId}`); // ✅ 날짜별 페이지로 이동
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    const isTodayMonth = today.getFullYear() === year && today.getMonth() === month;

    const calendar = [];
    let week = [];
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

    calendar.push(
      <div className="week header" key="header">
        {daysOfWeek.map((day, index) => (
          <div className="day header" key={index}>{day}</div>
        ))}
      </div>
    );

    for (let i = 0; i < firstDay; i++) {
      week.push(<div className="day empty" key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let dayClass = "day";
      if ((firstDay + day - 1) % 7 === 0) dayClass += " holiday";
      else if ((firstDay + day - 1) % 7 === 6) dayClass += " saturday";
      if (isTodayMonth && today.getDate() === day) dayClass += " today";

      week.push(
        <div className={dayClass} key={day} onClick={() => handleDateClick(day)}>
          {day}
        </div>
      );

      if ((firstDay + day) % 7 === 0) {
        calendar.push(<div className="week" key={`week-${calendar.length}`}>{week}</div>);
        week = [];
      }
    }

    while (week.length < 7) {
      week.push(<div className="day empty" key={`last-empty-${week.length}`}></div>);
    }
    calendar.push(<div className="week" key={`week-${calendar.length}`}>{week}</div>);

    return calendar;
  };

  return (
 
    <div className="calendar-container">
      <header>
        <button className="calendar_button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
          &lt;
        </button>
        <h3>
          {currentDate.getFullYear()}년 {currentDate.toLocaleString("default", { month: "long" })}
        </h3>
        <button className="calendar_button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
          &gt;
        </button>
      </header>

      <div className="calendar">{generateCalendar()}</div>
    </div>
  );
};

export default ExerciseCalendar;