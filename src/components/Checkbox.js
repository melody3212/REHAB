// src/components/Checkbox.js
import React from 'react';
import '../assets/css/checkbox.css';

export default function Checkbox({ checked, onChange, id, name, ...rest }) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        name={name}
        className="checkbox"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}