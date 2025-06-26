import React from "react";
import Button1 from "./Button1";
import "../assets/css/ExerciseTemItem.css";

// ① updateExercise 제거, deleteExercise만 남김
import { deleteExercise } from "../api/exercise";

const ExerciseTemItem = ({ exercise, setExercises, onEdit }) => {
  // ✅ 삭제 로직(API 연결)
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      await deleteExercise(exercise.id );
      setExercises((prev) => prev.filter((ex) => ex.id !== exercise.id));
    } catch (error) {
      console.error("운동 삭제 실패:", error);
      alert("운동 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="template-item">
      <div className="title-bar">
        <div className="title-center">
          
          <span>{exercise.content}</span>
          <Button1 type="edit" text="✏️" onClick={onEdit} />
        </div>
        <div className="title-right">
          <Button1 type="delete" text="X" onClick={handleDelete} />
        </div>
      </div>

      <div className="set-info">
        <span>횟수: {exercise.reps ?? "-"}회</span>
        <span>세트: {exercise.sets ?? "-"}세트</span>
      </div>

      <div className="description">
        {exercise.description || "설명이 없습니다."}
      </div>

      <div className="review-section">
        복습
        {/* 세트 수만큼 도트 표시하려면 이렇게 */}
        {Array(exercise.sets).fill(0).map((_, i) =>(
          <div key={i} className="dot"/>
        ))}
      </div>
    </div>
  );
};

export default ExerciseTemItem;