import React from 'react';
import '../assets/css/inputField.css';

const InputField = ({ fontSize, type, value, onChange, placeholder, className, min, max, height, width, paddingLeft }) => {
    return (
        <div >
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className}
                min={min} 
                max={max} 
                style={{
                    padding: '11px',
                    borderRadius: '8px',
                    border: '1px solid #FFFFFF',
                    backgroundColor: '#F7F7FB', 
                    color: '#A5A6B9', // 글자 색상
                    fontFamily: '"Noto Sans KR", sans-serif', // 폰트 패밀리
                    fontSize: fontSize || '13px', // 폰트 크기
                    fontStyle: 'normal', // 폰트 스타일
                    fontWeight: 400, // 폰트 두께
                    lineHeight: 'normal', // 줄 높이
                    height: height,
                    width: width,
                    boxSizing: 'border-box',
                    paddingLeft: paddingLeft || '11px',
                }}
            />
        </div>
    );
};

export default InputField;
