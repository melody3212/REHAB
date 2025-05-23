// ✅ ScheduleItem.jsx
import React from "react";
import "../assets/css/ScheduleItem.css";
import "../assets/css/TodaySchedule.css";
import "../assets/css/PopupSchedule.css";
import Button1 from "./Button1";

const ScheduleItem = ({
  id,
  title,
  items,
  checkedItems = [], // ✅ 기본값으로 빈 배열 설정
  onCheckboxChange, // ✅ 체크 상태 바꿀 때 호출되는 함수
  onEdit,
  onDelete,
  isPopup
}) => {
  return (
    <div className={`schedule-container ${isPopup ? "popup-mode" : ""}`}>
      <div className="schedule-header">
        <div className="schedule-edit">
          <p className="schedule-title">{title}</p>

          {/* ✏️ 수정 버튼 - 팝업 모드에서는 숨김 */}
          {!isPopup && (
            <Button1 text="✏️" type="edit" onClick={() => onEdit(id)} />
          )}
        </div>

        {/* ❌ 삭제 버튼 - 팝업 모드에서는 숨김 */}
        {!isPopup && (
          <Button1 text="X" type="delete" onClick={() => onDelete(id)} />
        )}
      </div>

      {/* ✅ 스케줄 아이템 리스트 */}
      <div className="schedule-content">
        {items.map((item, index) => (
          <label
            key={index}
            className={`schedule-item ${checkedItems[index] ? "checked" : ""}`}
          >
            <input
              type="checkbox"
              checked={!!checkedItems[index]} // ❗ undefined 방지
              onChange={() => onCheckboxChange(id, index)} // ✅ 체크 변경
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ScheduleItem;
