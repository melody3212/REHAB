import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale"; // ✅ 한국어 로케일 추가
import "../assets/css/ScheduleModal.css";
import Button1 from "./Button1";

const ScheduleAdd = ({ schedules, setSchedules, closeModal }) => {
  const [newDate, setNewDate] = useState(null);        // 🔹 선택한 날짜 저장
  const [newItems, setNewItems] = useState("");         // 🔹 입력한 일정 항목들

  // ✅ 날짜 포맷을 문자열로 변환
  const formatDate = (date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  // ✅ 일정 추가 핸들러
  const handleScheduleAdd = () => {
    if (!newDate || !newItems) {
      alert("날짜와 일정을 입력해주세요!");
      return;
    }

    const formattedDate = formatDate(newDate); // 🔸 "2025년 4월 14일 월요일" 같은 포맷
    const year = newDate.getFullYear();        // 🔸 연도 추출
    const month = newDate.getMonth() + 1;      // 🔸 월 (0부터 시작하므로 +1)
    const day = newDate.getDate();             // 🔸 일

    // 🔍 중복 확인 (동일 날짜 title이 이미 있을 경우 막기)
    const isDuplicate = schedules.some(schedule => schedule.title === formattedDate);
    if (isDuplicate) {
      alert("이미 등록된 날짜입니다!");
      return;
    }

    const newSchedule = {
      id: Date.now(),                           // ✅ 고유 ID
      title: formattedDate,                     // ✅ 사람이 보기 좋은 문자열
      year,                                     // ✅ 연도
      month,                                    // ✅ 월
      day,                                      // ✅ 일
      items: newItems.split("\n"),              // ✅ 줄바꿈으로 구분된 일정 리스트
    };

    setSchedules((prev) => [...prev, newSchedule]); // ✅ 기존 스케줄에 추가
    closeModal();                                    // ✅ 모달 닫기
  };

  return (
    <div className="ScheduleModal">
      <div className="ScheduleModal-content">
        <h3>새 일정 추가</h3>

        {/* 📅 날짜 선택 컴포넌트 */}
        <DatePicker
          selected={newDate}
          onChange={(date) => setNewDate(date)}
          dateFormat="yyyy년 MM월 dd일 EEEE"
          locale={ko}
          placeholderText="날짜를 선택하세요"
          className="date-picker"
        />

        {/* 📝 일정 입력 */}
        <textarea
          placeholder="일정을 입력하세요 (줄바꿈으로 구분)"
          value={newItems}
          onChange={(e) => setNewItems(e.target.value)}
        />

        {/* 버튼 영역 */}
        <div className="ScheduleModal-button">
          <Button1
            text="추가"
            type="add"
            onClick={handleScheduleAdd}/>
          <Button1 
            text="닫기"
            type="esc"
            onClick={closeModal}/>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAdd;
