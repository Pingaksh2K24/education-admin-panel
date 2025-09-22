import React, { useState } from 'react';
import { PlusIcon, AcademicCapIcon, ChartBarIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import ViewCourse from './ViewCourse/index';
import AddCourse from './AddCourse/index';
import './style.css';

const Courses: React.FC = () => {
  const [activeTab, setActiveTab] = useState('view');

  const stats = [
    { title: 'Total Courses', value: '12', icon: BookOpenIcon, color: '#3B82F6' },
    { title: 'Active Students', value: '1,245', icon: AcademicCapIcon, color: '#10B981' },
    { title: 'Departments', value: '8', icon: ChartBarIcon, color: '#F59E0B' },
    { title: 'New Admissions', value: '156', icon: PlusIcon, color: '#EF4444' }
  ];

  const tabs = [
    { id: 'view', label: 'View Courses', icon: BookOpenIcon },
    { id: 'add', label: 'Add Course', icon: PlusIcon }
  ];

  return (
    <div className="courses-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <AcademicCapIcon className="title-icon" />
            Course Management
          </h1>
          <p className="page-subtitle">Manage courses, departments, and academic programs</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <IconComponent />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="tabs-container">
        <div className="tabs-header">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent className="tab-icon" />
                {tab.label}
              </button>
            );
          })}
        </div>
        
        <div className="tab-content">
          {activeTab === 'view' && <ViewCourse onAddCourse={() => setActiveTab('add')} />}
          {activeTab === 'add' && <AddCourse />}
        </div>
      </div>
    </div>
  );
};

export default Courses;