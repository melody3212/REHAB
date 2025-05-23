import React, { useState } from "react";
import "../assets/css/Calendar.css";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const handleDateClick = (day) => {
        alert(`선택된 날짜: ${day} ${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`);
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

        // 요일 헤더
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        
        calendar.push(
            <div className="week header" key="header">
                {daysOfWeek.map((day, index) => (
                    <div className="day header" key={index}>{day}</div>
                ))}
                
            </div>
            
        );

        
        // 빈 칸 추가 (첫 주 시작 전에)
        for (let i = 0; i < firstDay; i++) {
            week.push(<div className="day empty" key={`empty-${i}`}></div>);
        }

        // 날짜 추가
        for (let day = 1; day <= daysInMonth; day++) {
            let dayClass = "day";

            if ((firstDay + day - 1) % 7 === 0) dayClass += " holiday"; // 일요일
            else if ((firstDay + day - 1) % 7 === 6) dayClass += " saturday"; // 토요일
            if (isTodayMonth && today.getDate() === day) dayClass += " today"; // 오늘 날짜

            week.push(
                <div className={dayClass} key={day} onClick={() => handleDateClick(day)}>
                    {day}
                </div>
            );

            // 한 주가 끝나면 배열에 추가 후 초기화
            if ((firstDay + day) % 7 === 0) {
                calendar.push(<div className="week" key={`week-${calendar.length}`}>{week}</div>);
                week = [];
            }
        }

        // 마지막 주 빈 칸 채우기
        while (week.length < 7) {
            week.push(<div className="day empty" key={`last-empty-${week.length}`}></div>);
        }
        calendar.push(<div className="week" key={`week-${calendar.length}`}>{week}</div>);

        return calendar;
    };

    return (
        <div className="calendar-container">
            <header >
                <button  className="calendar_button" onClick={() => 
                    setCurrentDate(new Date(currentDate.getFullYear(), 
                    currentDate.getMonth() - 1))}>&lt;</button>
                <h3>{currentDate.getFullYear()}년 {currentDate.toLocaleString("default", { month: "long" })} </h3>
                <button  className="calendar_button" onClick={() => 
                    setCurrentDate(new Date(currentDate.getFullYear(), 
                    currentDate.getMonth() + 1))}>&gt;</button>
            </header>
            
            <div className="calendar">{generateCalendar()}</div>
        </div>
    );
};

export default Calendar;
