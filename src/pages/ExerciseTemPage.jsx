import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseTemItem from "../components/ExerciseTemItem";
import ExerciseTemAdd from "../components/ExerciseTemAdd";
import ExerciseTemEdit from "../components/ExerciseTemEdit";
import Button1 from "../components/Button1";
import Header from "../components/Header";
import makeIcon from "../assets/images/make.png";
import searchIcon from "../assets/images/search.png";
import "../assets/css/ExerciseTemPage.css";

import { getExercise, createExercise, updateExercise } from "../api/exercise";

const ExerciseTemPage = ({ exercises, setExercises }) => {
  const nav = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);   // ✅ 추가 모달 상태
  const [editTarget, setEditTarget] = useState(null);         // ✅ 수정 대상 운동

    // 운동 목록
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExercise(); // ✅ 배열이어야 함
        setExercises(data);
      } catch (err) {
        console.error("운동 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [setExercises]);

  // ✅ 새로운 운동 추가
  const handleAddExercise = async (newExercise) => {
      try {
        const savedFromServer = await createExercise({
          content: newExercise.content,
          description: newExercise.description,
          sets: newExercise.sets,
          reps: newExercise.reps
        });
      console.log(savedFromServer)

      setExercises((prev) => [...prev, savedFromServer]);
      setShowAddModal(false);
    } catch (error) {
      console.error("운동 추가 실패:", error);
      alert("운동 추가에 실패했습니다.");
    }
  };

  // ✅ 기존 운동 수정
  const handleEditExercise = async (editedExercise) => {
    try {
      const updated = await updateExercise({
        exerciseId: editedExercise.id,
        content: editedExercise.content,
        description: editedExercise.description,
        sets: editedExercise.sets,
        reps: editedExercise.reps
      });

      setExercises((prev) =>
        prev.map((ex) => (ex.id === updated.id ? updated : ex))
      );
      setEditTarget(null);
    } catch (error) {
      console.error("운동 수정 실패:", error);
      alert("운동 수정에 실패했습니다.");
    }
  };
  
//   // ✅ 새로운 운동 추가
//   const handleAddExercise = (newExercise) => {
//     setExercises((prev) => [...prev, newExercise]);
//   };

//   // ✅ 기존 운동 수정 저장
//   const handleEditExercise = (editedExercise) => {
//     setExercises((prev) =>
//       prev.map((ex) => (ex.id === editedExercise.id ? editedExercise : ex))
//     );
//     setEditTarget(null); // ✅ 모달 닫기
//   };

  return (
    <div className="exercise-tem-page">
      <Header
        title={"재활운동 목록"}
        leftChild={<Button1 type="back" text="<" onClick={() => nav("/exercise")} />}
        rightChild={<Button1 type="search" icon={searchIcon} onClick={() => {}} />}
      />

      {/* ✅ 운동 목록 렌더링 */}
      <div className="Tem-list">
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <ExerciseTemItem
              key={exercise.id??index}
              exercise={exercise}
              setExercises={setExercises}
              onEdit={() => setEditTarget(exercise)} // ✅ 수정 버튼 눌렀을 때
            />
          ))
        ) : (
          <p>등록된 운동 템플릿이 없습니다.</p>
        )}
      </div>

      {/* ✅ 운동 추가 버튼 */}
      <Button1 type="make" icon={makeIcon} onClick={() => setShowAddModal(true)} />

      {/* ✅ 운동 추가 모달 */}
      {showAddModal && (
        <ExerciseTemAdd
          onClose={() => setShowAddModal(false)}
          onSave={handleAddExercise}
        />
      )}

      {/* ✅ 운동 수정 모달 */}
      {editTarget && (
        <ExerciseTemEdit
          exercise={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleEditExercise}
        />
      )}
    </div>
  );
};

export default ExerciseTemPage;
