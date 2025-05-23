// ✅ Profile_care.jsx - 보호자 프로필 컴포넌트
import React from "react";
import "../assets/css/Profile.css"; // 스타일 파일 따로 관리
import Button1 from "./Button1";
import TodayDate from "./TodayDate";

// 보호자 더미 데이터
const mockData = [
  {
    id: 1,
    name: "스칼렛",
    imageSrc: "src/assets/images/profile_sample.jpeg",
  },
];

const Profile_care = ({ patientNames = [] }) => {
  const { name, imageSrc } = mockData[0]; // 보호자 정보

  return (
    <div className="Profile">
      <div className="info_profile">
        <p>{name}님</p>
        {/* ✅ 담당환자 목록 출력 */}
        {patientNames.map((n, idx) => (
          <p key={idx}>담당환자{idx + 1}: {n}</p>
        ))}
        <Button1
          text={"내 정보 수정"}
          type={"profile"}
          onClick={() => alert("내 정보 수정")}
        />
      </div>

      <img src={imageSrc} alt="Profile" className="profile-image" />
      <TodayDate />
    </div>
  );
};

export default Profile_care;

