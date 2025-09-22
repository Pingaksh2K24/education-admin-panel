import React from 'react';
import { UserGroupIcon, AcademicCapIcon, ClipboardDocumentListIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import './StatsCards.css';

const StatsCards: React.FC = () => {
  const stats = [
    { value: '1,200', label: 'Total Students', icon: UserGroupIcon, color: 'blue' },
    { value: '5', label: 'Total Courses', icon: AcademicCapIcon, color: 'green' },
    { value: '200', label: 'Active Admissions', icon: ClipboardDocumentListIcon, color: 'purple' },
    { value: '15', label: 'Upcoming Events', icon: CalendarDaysIcon, color: 'orange' }
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <IconComponent className="icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;