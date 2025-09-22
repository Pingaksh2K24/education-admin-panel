import React, { useState } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import './style.css';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  name: string;
  value: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select options',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue));
  };

  const getSelectedLabels = () => {
    return value.map(v => options.find(opt => opt.value === v)?.label).filter(Boolean);
  };

  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="multi-select-wrapper">
        <div 
          className={`multi-select-input ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="selected-items">
            {value.length === 0 ? (
              <span className="placeholder">{placeholder}</span>
            ) : (
              getSelectedLabels().map((label, index) => (
                <span key={index} className="selected-item">
                  {label}
                  <XMarkIcon 
                    className="remove-icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(value[index]);
                    }}
                  />
                </span>
              ))
            )}
          </div>
          <ChevronDownIcon className={`select-icon ${isOpen ? 'rotated' : ''}`} />
        </div>
        {isOpen && (
          <div className="multi-select-dropdown">
            {options.map((option) => (
              <div
                key={option.value}
                className={`dropdown-option ${value.includes(option.value) ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;