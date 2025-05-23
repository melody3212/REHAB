import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Walking.css";

const Walking = ({ goal, steps }) => {
    const progress = Math.min((steps / goal) * 100, 100);

    

    return (
        <div className="walking-container" >
            <p className="steps-info">걸음수<br/>{steps}</p>
        </div>
    );
};

export default Walking;

