import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import './style.css';

interface Option {
  value: string;
  label: string;
}

interface SingleSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required = false,
  disabled = false
}) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="select-wrapper">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="select-input"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="select-icon" />
      </div>
    </div>
  );
};

export default SingleSelect;