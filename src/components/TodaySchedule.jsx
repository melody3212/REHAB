// ✅ TodaySchedule.jsx
import React, { useState } from "react";
import "../assets/css/TodaySchedule.css";
import "../assets/css/PopupSchedule.css";
import ScheduleItem from "./ScheduleItem";
import Button1 from "./Button1";

const TodaySchedule = ({ schedules, checkedStates, onCheckboxChange }) => {
  const [showModal, setShowModal] = useState(false);

  // 📌 오늘 날짜 계산
  const today = new Date();

  // 📌 오늘에 해당하는 스케줄 찾기
  const todaySchedule = schedules.find(
    (schedule) =>
      schedule.year === today.getFullYear() &&
      schedule.month === today.getMonth() + 1 &&
      schedule.day === today.getDate()
  );

  return (
    <>
      {/* 📌 오늘의 스케줄 카드 (작은 UI) */}
      <div className="schedule_today-box">
        <div
          className="schedule_header"
          onClick={() => todaySchedule && setShowModal(true)}
        >
          오늘의 스케줄
        </div>

        <div className="schedule_content">
          {todaySchedule && todaySchedule.items.length > 0 ? (
            todaySchedule.items.map((item, index) => (
              <label
                key={index}
                className={`schedule-item ${
                  checkedStates?.[todaySchedule.id]?.[index] ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={checkedStates?.[todaySchedule.id]?.[index] || false}
                  onChange={(e) => {
                    e.stopPropagation(); // ✅ 클릭 이벤트 버블링 방지
                    onCheckboxChange?.(todaySchedule.id, index);
                  }}
                />
                <span>{item}</span>
              </label>
            ))
          ) : (
            <p>일정 없음</p>
          )}
        </div>
      </div>

      {/* 📌 팝업 모드 상세 보기 (전체 리스트) */}
      {showModal && todaySchedule && (
        <div className="today-modal-overlay">
          <div className="modal-content no-padding">
            <div className="modal-top">
              <Button1
                text="X"
                type="esc"
                onClick={() => setShowModal(false)}
              />
            </div>

            <ScheduleItem
              id={todaySchedule.id}
              title={todaySchedule.title}
              items={todaySchedule.items}
              checkedItems={checkedStates[todaySchedule.id] || []} // ✅ 체크 상태 넘김
              onCheckboxChange={onCheckboxChange} // ✅ 상태 변경 함수 넘김
              isPopup={true} // ✅ 팝업 모드 활성화
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TodaySchedule;

