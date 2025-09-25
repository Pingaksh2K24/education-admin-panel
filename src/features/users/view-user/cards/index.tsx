import React from 'react';
import { UsersIcon, UserCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import './style.css';

interface StatsCardsProps {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  teacherUsers: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalUsers,
  activeUsers,
  adminUsers,
  teacherUsers
}) => {
  return (
    <div className="stats-cards-grid">
      <div className="stat-card">
        <div className="stat-icon total">
          <UsersIcon className="w-6 h-6" />
        </div>
        <div className="stat-content">
          <div className="stat-number">{totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon active">
          <UserCircleIcon className="w-6 h-6" />
        </div>
        <div className="stat-content">
          <div className="stat-number">{activeUsers}</div>
          <div className="stat-label">Active Users</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon admin">
          <ShieldCheckIcon className="w-6 h-6" />
        </div>
        <div className="stat-content">
          <div className="stat-number">{adminUsers}</div>
          <div className="stat-label">Admins</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon teacher">
          <UsersIcon className="w-6 h-6" />
        </div>
        <div className="stat-content">
          <div className="stat-number">{teacherUsers}</div>
          <div className="stat-label">Teachers</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;