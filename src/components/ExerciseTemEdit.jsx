import React, { useState } from "react";
import Button1 from "./Button1";
import "../assets/css/ExerciseTemModal.css"; // ✅ 동일한 CSS 재사용

const ExerciseTemEdit = ({ exercise, onClose, onSave }) => {
  const [content, setContent] = useState(exercise.content);
  const [description, setDescription] = useState(exercise.description);
  const [sets, setSets] = useState(exercise.sets);
  const [reps, setReps] = useState(exercise.reps);

  const handleSave = () => {
    if (!content || !sets || !reps) {
      alert("이름, 세트, 횟수를 모두 입력해주세요!");
      return;
    }

    const edited = {
      ...exercise,
      content,
      description,
      sets,
      reps
    };

    onSave(edited);
    onClose(); //수정 후 모달 닫기 
  };

  return (
    <div className="ExerciseTemModal">
      <div className="ExerciseTemModal-content">
        <h3>운동 수정하기</h3>
        <input
          type="text"
          placeholder="운동 이름"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
          onChange={(e) => setSets(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="횟수"
          value={reps}
          onChange={(e) => setReps(parseInt(e.target.value))}
        />
        <div className="ExerciseTemModal-button">
          <Button1 
            text="수정 완료" 
            type="add" 
            onClick={handleSave} />
          <Button1 
            text="취소" 
            type="esc" 
            onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ExerciseTemEdit;

