import React from "react";
import { useNavigate } from 'react-router-dom';
import "../assets/css/Profile.css";
import Button1 from "./Button1";
import TodayDate from "./TodayDate";

const mockData = [
  {
    id: 1,
    name: "스칼렛",
    treatmentArea: "허리",
    imageSrc: require('../assets/images/profile_sample.jpeg'),
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const { name, treatmentArea, imageSrc } = mockData[0]; 

  return (
    <div className="Profile">
      <div className="info_profile">
        <p>{name}님</p>
        <p>치료 부위: {treatmentArea}</p>
        <Button1 
          text="내 정보 수정"
          type="profile"
          onClick={() => navigate('/')}
        />
      </div>
      <img src={imageSrc} alt="Profile" className="profile-image" />
      <TodayDate />
    </div>
  );
};

export default Profile;
