import React from 'react';
import { ChartBarIcon, UserGroupIcon, AcademicCapIcon, CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import CourseTable from '../../features/dashboard/courseTable/page';
import StatsCards from '../../features/dashboard/statsCards/page';
import './style.css';

const Dashboard: React.FC = () => {
  const quickActions = [
    { title: 'Add Student', icon: UserGroupIcon, color: 'blue' },
    { title: 'Create Course', icon: AcademicCapIcon, color: 'green' },
    { title: 'Schedule Event', icon: CalendarDaysIcon, color: 'purple' },
    { title: 'View Reports', icon: ChartBarIcon, color: 'orange' }
  ];

  const recentActivities = [
    { action: 'New student admission', time: '2 hours ago', type: 'success' },
    { action: 'Course updated: Computer Science', time: '4 hours ago', type: 'info' },
    { action: 'Event scheduled: Annual Day', time: '6 hours ago', type: 'warning' },
    { action: 'Gallery updated with new images', time: '1 day ago', type: 'info' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome to Admin Dashboard</h1>
          <p>Manage your educational institution efficiently</p>
        </div>
        <div className="header-stats">
          <div className="header-stat">
            {/* <TrendingUpIcon className="stat-icon" /> */}
            <div>
              <span className="stat-number">95%</span>
              <span className="stat-text">Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="main-section">
          <StatsCards />
          
          <div className="dashboard-grid">
            <div className="grid-item quick-actions">
              <div className="section-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="actions-grid">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <div key={index} className={`action-card ${action.color}`}>
                      <IconComponent className="action-icon" />
                      <span>{action.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid-item recent-activity">
              <div className="section-header">
                <h3>Recent Activity</h3>
              </div>
              <div className="activity-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className={`activity-item ${activity.type}`}>
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <p>{activity.action}</p>
                      <span className="activity-time">
                        <ClockIcon className="time-icon" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <CourseTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;