import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import "../assets/css/ScheduleModal.css"; // 스타일 재사용
import Button1 from "./Button1";

// 🔧 ScheduleEdit 모달 컴포넌트
export default function ScheduleEdit({ schedule, schedules, setSchedules, closeModal }) {
  // schedule 데이터 없으면 렌더링 하지 않음
  // 훅은 컴포넌트 최상단에서 호출
  const parseDateFromTitle = (titleStr) => {
    try {
      const match = titleStr.match(/(\d+)년 (\d+)월 (\d+)일/);
      if (!match) return new Date();
      const [, year, month, day] = match.map(Number);
      return new Date(year, month - 1, day);
    } catch {
      return new Date();
    }
  };

  // 초기 상태: schedule 존재 시 데이터로, 아니면 기본
  const [editedDate, setEditedDate] = useState(
    schedule ? parseDateFromTitle(schedule.title) : new Date()
  );
  const [editedItems, setEditedItems] = useState(
    schedule ? schedule.items.join("\n") : ""
  );

  // schedule prop 변경 시 상태 초기화
  useEffect(() => {
    if (schedule) {
      setEditedDate(parseDateFromTitle(schedule.title));
      setEditedItems(schedule.items.join("\n"));
    }
  }, [schedule]);

  if (!schedule) return null;

  const { id } = schedule;

  const formatDate = (date) =>
    date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });

  const handleEdit = () => {
    if (!editedItems.trim()) {
      alert("수정할 내용을 입력해주세요!");
      return;
    }
    const updatedTitle = formatDate(editedDate);
    const year = editedDate.getFullYear();
    const month = editedDate.getMonth() + 1;
    const day = editedDate.getDate();

    // 중복 날짜 방지
    const isDuplicate = schedules.some(
      (s) => s.title === updatedTitle && s.id !== id
    );
    if (isDuplicate) {
      alert("이미 해당 날짜에 일정이 있습니다!");
      return;
    }

    // 스케줄 업데이트
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, title: updatedTitle, year, month, day, items: editedItems.split("\n") }
          : s
      )
    );
    closeModal();
  };

  return (
    <div className="ScheduleModal">
      <div className="ScheduleModal-content">
        <h3>일정 수정</h3>
        <DatePicker
          selected={editedDate}
          onChange={setEditedDate}
          dateFormat="yyyy년 MM월 dd일 EEEE"
          locale={ko}
          className="date-picker"
        />
        <textarea
          value={editedItems}
          onChange={(e) => setEditedItems(e.target.value)}
        />
        <div className="ScheduleModal-button">
          <Button1 text="수정" type="add" onClick={handleEdit} />
          <Button1 text="취소" type="esc" onClick={closeModal} />
        </div>
      </div>
    </div>
  );
}
