import React from "react";

// 날짜를 "YYYY년"과 "M우러 D일" 형식으로 변환하는 함수
const getFormattedDate = () => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
};

const TodayDate = () => {
  const { year, month, day } = getFormattedDate();
  
  return (
    <div className="today-date">
      <h3>{month}월 {day}일</h3>
    </div>
  );
};

export default TodayDate;
