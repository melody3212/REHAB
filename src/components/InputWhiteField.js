import React from 'react';
import '../assets/css/inputField.css';

const InputWhiteField = ({ 
    type, 
    value, 
    onChange, 
    placeholder, 
    className, 
    min, 
    max, 
    fontSize, 
    fontWeight, 
    placeholderColor, 
    color
}) => {
    return (
        <div style={{ margin: '0px 0' }}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className}
                min={min} 
                max={max} 
                style={{
                    border: 'none', /* 테두리 없앰 */
                    outline: 'none', /* 포커스 시 아웃라인 없앰 (선택 사항) */
                    color: color || '#A5A6B9', // 글자 색상
                    fontFamily: '"Noto Sans KR", sans-serif', // 폰트 패밀리
                    fontSize: fontSize || '13px', // 폰트 크기 (기본값 설정)
                    fontStyle: 'normal', // 폰트 스타일
                    fontWeight: fontWeight || 400, // 폰트 두께 (기본값 설정)
                    lineHeight: 'normal', // 줄 높이
                }}
            />
            <style>
                {`
                    input::placeholder {
                        color: ${placeholderColor || '#A5A6B9'}; /* 기본 색상 설정 */
                        opacity: 1; /* 불투명도 설정 */
                    }
                `}
            </style>
        </div>
    );
};

export default InputWhiteField;
