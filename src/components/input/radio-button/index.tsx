import React from 'react';
import './style.css';

interface Option {
  value: string;
  label: string;
}

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false
}) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="radio-group">
        {options.map((option) => (
          <label key={option.value} className="radio-option">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="radio-input"
            />
            <span className="radio-custom"></span>
            <span className="radio-label">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;