import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Walkingpage.css";
import Header from "../components/Header";
import Button1 from "../components/Button1";


const WalkingPage = ({ goal, setGoal, steps, setSteps }) => {
    const nav = useNavigate();

    const handleGoalChange = (e) => {
        const value = e.target.value;
        setGoal(value === "" ? 0 : Number(value)); // ✅ 빈 값이면 0으로 설정
    };

    const handleAddSteps = () => {
        setSteps(prev => Math.min(prev + 500, goal)); // ✅ 500보씩 추가
    };

    const handleReset = () => {
        setSteps(0);
    };

    const handleConfirmGoal = () => {
        nav("/"); // ✅ 홈으로 이동 (값 유지됨)
    };

    const progress = Math.min((steps / goal) * 100, 100);

    return (
        <div className="walkingpage-container">
            <Header 
                title={"오늘의 걸음 수"}
                leftChild={<Button1 type={"back"} text={"<"} onClick={() => nav(`/`)} />}
                rightChild={""}
            />
            
            <div className="steps-info">
                <p>현재 걸음 수: {steps} 보</p>
                <p>목표까지 {goal - steps} 보 남음</p>
            </div>

            <input 
                type="number" 
                value={goal || ""} 
                onChange={handleGoalChange} 
                className="goal-input"
            />
            
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            
            <div className="buttons">
                <button onClick={handleAddSteps}>500보 추가</button>
                <button onClick={handleReset} className="reset-btn">초기화</button>
            </div>

            <Button1 title={"확인"} type={"basic"} onClick={handleConfirmGoal} />
        </div>
    );
};

export default WalkingPage;
