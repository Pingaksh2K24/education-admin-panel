import React, { useState } from 'react';
import { PlusIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import AddFaculty from './AddFacultty';
import ViewFaculty from './ViewFaculty';
import { AddButton } from '../../components/buttons/page';
import './style.css';

type TabType = 'view' | 'add';

const Faculty: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('view');

  return (
    <div className="faculty-page">
      <div className="faculty-header-main">
        <div className="header-left">
          <div className="page-title-main">
            <AcademicCapIcon className="title-icon-main" />
            <h1>Faculty Management</h1>
          </div>
          <p className="page-subtitle-main">Manage faculty members and their information</p>
        </div>
        <div className="header-actions">
          <AddButton 
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={() => setActiveTab('add')}
          >
            Add New Faculty
          </AddButton>
        </div>
      </div>

      <div className="faculty-tabs">
        <button 
          className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          <UserGroupIcon className="tab-icon" />
          View Faculty
        </button>
        <button 
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          <PlusIcon className="tab-icon" />
          Add Faculty
        </button>
      </div>

      <div className="faculty-content">
        {activeTab === 'view' && <ViewFaculty />}
        {activeTab === 'add' && <AddFaculty />}
      </div>
    </div>
  );
};

export default Faculty;