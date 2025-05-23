import React, { useState } from "react";
import Button1 from "./Button1";
import "../assets/css/Medicine.css";

const Medicine = () => {
  // ✅ 기본 복용약 데이터
  const [medicine, setMedicine] = useState({
    name: "엑손정",
    frequency: "1일 3회(아침, 점심, 저녁)",
    timing: "식후 30분",
  });

  // 입력값이 없을 경우 기본 메시지
  const isEmpty = !medicine.name && !medicine.frequency && !medicine.timing;

  return (
    <div className="medicine-container">
      {/* ✅ 제목 + 수정 버튼 가로 정렬 */}
      <div className="medicine-header">
        <h3 className="medicine-title">복용하는 약 / 횟수 / 용량</h3>
        <Button1 
          text="✏️" 
          type="edit" 
          onClick={() => console.log("Edit clicked")} 
        />
      </div>
      <div className="medicine-content">
        {isEmpty ? (
          <p className="placeholder-text">복용약 및 횟수, 용량을 입력해주세요.</p>
        ) : (
          <p>
            복용약: {medicine.name} <br /> 횟수: {medicine.frequency} <br /> {medicine.timing}
          </p>
        )}
      </div>
    </div>
  );
};

export default Medicine;

