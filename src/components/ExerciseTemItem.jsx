import React from "react";
import Button1 from "./Button1";
import "../assets/css/ExerciseTemItem.css";

const ExerciseTemItem = ({ exercise, setExercises, onEdit }) => {
  // ✅ 삭제 로직
  const handleDelete = () => {
    const confirm = window.confirm("정말 삭제할까요?");
    if (!confirm) return;
    setExercises((prev) => prev.filter((ex) => ex.id !== exercise.id));
  };

  return (
    <div className="template-item">
      <div className="title-bar">
        {/* ✅ 운동 이름 + 수정 버튼 */}
        <div className="title-center">
          <span>{exercise.name}</span>
          <Button1 type="edit" text="✏️" onClick={onEdit} />
        </div>

        {/* ✅ 삭제 버튼 */}
        <div className="title-right">
          <Button1 type="delete" text="X" onClick={handleDelete} />
        </div>
      </div>

      <div className="set-info">
        <span>횟수: {exercise.reps}회</span>
        <span>세트: {exercise.sets}세트</span>
      </div>

      <div className="description">
        {exercise.description}
      </div>

      <div className="review-section">
        복습
        <div className="dot star"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default ExerciseTemItem;


