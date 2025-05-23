import React from 'react';
import '../assets/css/comment.css';

export default function Comment({
  id,
  name,
  value,
  onChange,
  onSubmit,
  placeholder = '댓글을 입력하세요.',
  ...rest
}) {
  return (
    <div className="comment-container">
      <input
        type="text"
        id={id}
        name={name}
        className="comment-box"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      {/* 댓글 등록 아이콘 버튼 */}
      <button
        type="button"
        className="comment-icon-button"
        onClick={onSubmit}
        disabled={!value.trim()}
      />
    </div>
  );
}
