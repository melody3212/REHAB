import React from 'react';
import '../assets/css/button.css'; 

const Button = ({
    onClick,
    children,
    type = 'button',
    className = '',
    disabled = false,
    backgroundColor = '#007bff',
    textColor = 'white',
    padding = '10px 20px',
    borderRadius = '8px',
    width = '141px',
    height = '36px',
    fontSize,
    fontWeight = '400'
}) => {
    return (
        <button
            type={type}
            className={`custom-button ${className}`}
            onClick={onClick}
            disabled={disabled}
            style={{
                backgroundColor,
                color: textColor,
                padding,
                borderRadius,
                width,
                height,
                fontWeight,
                fontFamily: 'Noto Sans KR',
                gap: '10px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize,
                lineHeight: height,
                whiteSpace: 'nowrap',
                textDecoration: 'none', // 링크 밑줄 제거
                outline: 'none',        // 포커스 아웃라인 제거
                border: 'none'          // 기본 테두리 제거
            }}
        >
            {children}
        </button>
    );
};

export default Button;