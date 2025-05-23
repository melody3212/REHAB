// ✅ PatientDetail.jsx
import React from "react";
import "../assets/css/PatientDetail.css";
import Button1 from "./Button1";

const PatientDetail = ({ patient, onClose }) => {
  const { name, diagnosis, symptoms, medications } = patient;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>환자 상세정보</h3>
        <p><strong>이름:</strong> {name}</p>
        <p><strong>진단명:</strong> {diagnosis}</p>
        <p><strong>증상:</strong> {symptoms}</p>
        <p><strong>복용약:</strong> {medications}</p>

        <div className="modal-buttons">
          <Button1 type="back" text="닫기" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;

