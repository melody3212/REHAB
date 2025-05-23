import React from 'react';
import '../assets/css/inputField1.css'

const InputField1 = ({ type, value, onChange, placeholder, className }) => {
    return (
        <div style={{ margin: '7px 0' }}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className}
                style={{
                    padding: '11px',
                    borderRadius: '8px',
                    border: '1px solid #FFFFFF',
                    backgroundColor: '#F7F7FB' // 배경 색상 추가
                }}
            />
        </div>
    );
};

export default InputField1;