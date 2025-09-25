import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import './style.css';

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  min,
  max
}) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="date-picker-wrapper">
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          className="date-picker-input"
        />
        <CalendarIcon className="date-picker-icon" />
      </div>
    </div>
  );
};

export default DatePicker;