import React, { useState } from "react";
import "../assets/css/ExerciseSelect.css";
import Button1 from "./Button1";

const ExerciseSelect = ({ exercises, onSave, onClose }) => {
  // ✅ 선택된 운동 id를 저장
  const [selectedIds, setSelectedIds] = useState([]);

  // ✅ 체크 상태 토글
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  // ✅ 저장 버튼 누르면 선택된 운동들만 반환
  const handleExerciseSelect = () => {
    const selectedExercises = exercises.filter((ex) =>
      selectedIds.includes(ex.id)
    );
    onSave(selectedExercises);
  };

  return (
    <div className="select-modal">
      <div className="select-content">
        <h3>운동 선택</h3>

        {/* ✅ 운동 리스트 */}
        <ul className="select-list">
          {exercises.map((ex) => (
            <li
              key={ex.id}
              className={`select-item ${
                selectedIds.includes(ex.id) ? "selected" : ""
              }`}
              onClick={() => toggleSelect(ex.id)}
            >
              {ex.name}
            </li>
          ))}
        </ul>

        {/* ✅ 하단 버튼 */}
        <div className="select-actions">
          <Button1 text="선택 완료" type="add" onClick={handleExerciseSelect} />
          <Button1 text="취소" type="esc" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ExerciseSelect;
