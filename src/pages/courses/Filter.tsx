import React from 'react';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface FilterProps {
  onCourseNameFilter: (value: string) => void;
  onSearch: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onCourseNameFilter, onSearch }) => {
  return (
    <div className="filter-container">
      <div className="filter-header">
        <FunnelIcon className="filter-icon" />
        <h3 className="filter-title">Filters</h3>
      </div>
      
      <div className="filter-content">
        <div className="filter-group">
          <label className="filter-label">Course Name</label>
          <select 
            onChange={(e) => onCourseNameFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Courses</option>
            <option value="Computer Science Engineering">Computer Science Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <div className="search-input-container">
            <MagnifyingGlassIcon className="search-icon" />
            <input 
              type="text"
              placeholder="Search courses, departments..."
              onChange={(e) => onSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;