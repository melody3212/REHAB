// ✅ Patient.jsx
import React from "react";
import "../assets/css/Patient.css";
import Button1 from "./Button1";

const Patient = ({
  id,
  name,
  todaySchedule = [],
  checkedSchedule = [],
  diagnosis,
  symptoms,
  medications,
  onCheckboxChange,
  onEdit,
  onDelete,
  onViewDetail,
  isPopup
}) => {
  return (
    <div className={`patient-container ${isPopup ? "popup-mode" : ""}`}>
      <div className="patient-header">
        <div className="patient-edit">
          <p className="patient-name"> {name}</p>
          {!isPopup && (
            <>
              <Button1 text="🔍" type="search" onClick={onViewDetail} />
              <Button1 text="✏️" type="edit" onClick={() => onEdit(id)} />
            </>
          )}
        </div>

        {!isPopup && (
          <Button1 text="X" type="delete" onClick={() => onDelete(id)} />
        )}
      </div>

      {/* 오늘의 스케줄 */}
      <div className="patient-content">
        {todaySchedule.map((item, index) => (
          <label
            key={index}
            className={`patient-item ${checkedSchedule[index] ? "checked" : ""}`}
          >
            <input
              type="checkbox"
              checked={!!checkedSchedule[index]}
              onChange={() => onCheckboxChange(id, index)}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Patient;
