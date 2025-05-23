// ✅ CareHome.jsx
import React, { useState, useEffect } from 'react';
import '../assets/css/CareHome.css';
import { useNavigate } from 'react-router-dom';

import Calendar from '../components/Calendar';
import Profile_care from '../components/Profile_care';
import Patient from '../components/Patient';
import PatientDetail from '../components/PatientDetail';
import Button1 from '../components/Button1';

import matchComIcon from '../assets/images/match_com.png';
import patientIcon from '../assets/images/patient.png';

const CareHome = () => {
  const nav = useNavigate();

  // ✅ 더미 환자 데이터
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "김철수",
      todaySchedule: ["허리 스트레칭", "온찜질", "자세 교정"],
      checkedSchedule: [false, true, false],
      diagnosis: "허리디스크",
      symptoms: "밤에 통증이 심해짐",
      medications: "타이레놀, 근이완제"
    },
    {
      id: 2,
      name: "이영희",
      todaySchedule: ["무릎 운동", "찜질", "보조기 착용"],
      checkedSchedule: [false, false, false],
      diagnosis: "퇴행성 관절염",
      symptoms: "걷기 어려움, 뻣뻣함",
      medications: "소염진통제"
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null); // 팝업으로 열 환자

  // ✅ ESC 키로 팝업 닫기 (선택적 UX 개선)
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setSelectedPatient(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // ✅ 체크박스 변경
  const handleCheckboxChange = (id, index) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              checkedSchedule: p.checkedSchedule.map((v, i) =>
                i === index ? !v : v
              ),
            }
          : p
      )
    );
  };

  // ✅ 수정 버튼
  const handleEditPatient = (id) => {
    alert(`환자 ID ${id} 수정`);
  };

  // ✅ 삭제
  const handleDeletePatient = (id) => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok) return;
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container">
      {/* 🔓 로그아웃 */}
      <div className="logout">
        <Button1 text={"로그아웃"} type={"profile"} onClick={() => nav(`/`)} />
      </div>

      {/* 👤 보호자 프로필 */}
      <div className="info">
        <Profile_care patientNames={patients.map(p => p.name)} />
      </div>

      {/* 📌 커뮤니티 버튼들 */}
      <div className="community">
        <div className="match_com">
          <img className="com_img" src={matchComIcon} alt="환자 매칭 아이콘" />
          <Button1 text={"환자 매칭 게시판"} type={"community"} onClick={() => nav(`/`)} />
        </div>
        <div className="user_com">
          <img className="com_img" src={patientIcon} alt="환자등록 아이콘" />
          <Button1 text={"환자등록"} type={"community"} onClick={() => nav(`/`)} />
        </div>
      </div>

      {/* ✅ 환자 리스트 */}
      <div className="PatientList">
        {patients.map((p) => (
          <Patient
            key={p.id}
            id={p.id}
            name={p.name}
            todaySchedule={p.todaySchedule}
            checkedSchedule={p.checkedSchedule}
            diagnosis={p.diagnosis}
            symptoms={p.symptoms}
            medications={p.medications}
            onCheckboxChange={handleCheckboxChange}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
            onViewDetail={() => setSelectedPatient(p)} // 👁️ 상세 보기 버튼
          />
        ))}
      </div>

      {/* 📅 달력 */}
      <div className="calendar">
        <Calendar />
      </div>

      {/* 🩺 환자 상세 팝업 */}
      {selectedPatient && (
        <PatientDetail
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default CareHome;

