// 📁 src/pages/SchedulePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/SchedulePage.css';
import Button1 from "../components/Button1";
import Header from "../components/Header";
import ScheduleItem from "../components/ScheduleItem";
import Medicine from "../components/Medicine";
import ScheduleAdd from "../components/ScheduleAdd";
import ScheduleEdit from "../components/ScheduleEdit";
import makeIcon from '../assets/images/make.png';





const SchedulePage = ({ schedules, setSchedules, checkedStates, setCheckedStates }) => {
  
// ✅ checkedStates 초기화 (schedules 바뀔 때마다)
  useEffect(() => {
    setCheckedStates((prev) => {
      const newStates = { ...prev };

      schedules.forEach((schedule) => {
        if (!newStates[schedule.id]) {
          newStates[schedule.id] = Array(schedule.items.length).fill(false);
        }
      });

      return newStates;
    });
  }, [schedules]);


  const nav = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showToday, setShowToday] = useState(false);

  // ✅ 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (scheduleId, itemIndex) => {
    setCheckedStates(prev => ({
      ...prev,
      [scheduleId]: prev[scheduleId].map((checked, idx) =>
        idx === itemIndex ? !checked : checked
      )
    }));
  };

  // ✅ 삭제 핸들러
  const deleteHandler = (idToDelete) => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;
    const updated = schedules.filter(schedule => schedule.id !== idToDelete);
    setSchedules(updated);
  };

  // ✅ 월별 필터링 + 정렬
  const filteredAndSortedSchedules = [...schedules]
    .filter(schedule => schedule.month === currentMonth)
    .sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1, a.day);
      const dateB = new Date(b.year, b.month - 1, b.day);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // ✅ 현재 수정 중인 스케줄 찾기 (타입 통일!)
  const currentSchedule = schedules.find(
    (s) => Number(s.id) === Number(editModal.id)
  );

  return (
    <>
      <Header
        title={"스케줄 관리"}
        leftChild={<Button1 type={"back"} text={"<"} onClick={() => nav(`/`)} />}
        
      />

      <div className="SchedulePage-wrapper">
        {/* 💊 약 정보 */}
        <div className="medicine-wrapper">
          <Medicine />
        </div>

        {/* 📅 월 선택 */}
        <div className="month-selector">
          <button onClick={() => setCurrentMonth(prev => (prev === 1 ? 12 : prev - 1))}>◀</button>
          <span>{currentMonth}월</span>
          <button onClick={() => setCurrentMonth(prev => (prev === 12 ? 1 : prev + 1))}>▶</button>
        </div>

        {/* 🔽 정렬 + 오늘 보기 버튼 */}
        <div className="sort-selector">
          <label htmlFor="sortOrder"></label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">1일부터</option>
            <option value="desc">말일부터</option>
          </select>
        </div>

        {/* 📋 일정 목록 */}
        <div className="schedule-wrapper">
          {filteredAndSortedSchedules.length > 0 ? (
            filteredAndSortedSchedules.map((schedule) => (
              <ScheduleItem
                key={schedule.id}
                id={schedule.id}
                title={schedule.title}
                items={schedule.items}
                checkedItems={checkedStates[schedule.id] || []}
                onCheckboxChange={handleCheckboxChange}
                onDelete={deleteHandler}
                onEdit={(id) => {
                  setShowToday(false);
                  setTimeout(() => {
                    setEditModal({ isOpen: true, id: Number(id) }); // ✅ 타입 숫자로
                  }, 100);
                }}
              />
            ))
          ) : (
            <p className="no-schedule">해당 월에 일정이 없습니다.</p>
          )}
        </div>
      </div>

      {/* ➕ 추가 버튼 */}
      <Button1
        type="make"
        icon={makeIcon}
        onClick={() => setShowModal(true)}
      />

      {/* ➕ 추가 모달 */}
      {showModal && (
        <ScheduleAdd
          schedules={schedules}
          setSchedules={setSchedules}
          closeModal={() => setShowModal(false)}
        />
      )}

      {/* ✏️ 수정 모달 */}
      {editModal.isOpen && currentSchedule && (
        <ScheduleEdit
          schedule={currentSchedule}
          setSchedules={setSchedules}
          schedules={schedules}
          closeModal={() => setEditModal({ isOpen: false, id: null })}
        />
      )}
    </>
  );
};

export default SchedulePage;
