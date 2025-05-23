import React, { useState } from "react";
import "../assets/css/ExerciseTemModal.css";
import Button1 from "./Button1";

const ExerciseTemAdd = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);

  const handleExerciseAdd = () => {
    if (!name.trim()) return alert("운동 이름을 입력해주세요.");
    const newExercise = {
      id: Date.now(),
      name,
      description,
      sets,
      reps
    };
    onSave(newExercise);
    onClose();
  };

  return (
    <div className="ExerciseTemModal">
      <div className="ExerciseTemModal-content">
        <h3>새 운동 추가</h3>
        <input
          type="text"
          placeholder="운동 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="운동 설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="세트 수"
          value={sets}
          min="1"
          onChange={(e) => setSets(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="반복 횟수"
          value={reps}
          min="1"
          onChange={(e) => setReps(Number(e.target.value))}
        />
    
        {/* 버튼 영역 */}
        <div className="ExerciseTemModal-button">
          <Button1
            text="추가"
            type="add"
            onClick={handleExerciseAdd}/>
          <Button1 
            text="닫기"
            type="esc"
            onClick={onClose}/>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTemAdd;
