import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import './style.css';

interface Option {
  value: string;
  label: string;
}

interface CheckboxProps {
  label: string;
  name: string;
  value: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false
}) => {
  const handleChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="checkbox-group">
        {options.map((option) => (
          <label key={option.value} className="checkbox-option">
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
              className="checkbox-input"
            />
            <span className="checkbox-custom">
              {value.includes(option.value) && <CheckIcon className="check-icon" />}
            </span>
            <span className="checkbox-label">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;