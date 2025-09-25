import React, { useState } from 'react';
import { UserCircleIcon, BellIcon, MagnifyingGlassIcon, Cog6ToothIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import './style.css';

interface HeaderProps {
  sidebarCollapsed?: boolean;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  sidebarCollapsed = false, 
  title = 'Welcome Admin',
  subtitle,
  icon 
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'New student admission request', time: '5 min ago', type: 'info' },
    { id: 2, message: 'Course schedule updated', time: '1 hour ago', type: 'success' },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', type: 'warning' }
  ];

  return (
    <header className={`header ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-left">
        <div className="page-header-content">
          {icon && <div className="page-header-icon">{icon}</div>}
          <div className="page-header-text">
            <h1 className="page-header-title">{title}</h1>
            {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="header-actions">
          <div className="notification-container">
            <button
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon className="notification-icon" />
              <span className="notification-badge">3</span>
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="dropdown-header">
                  <h4>Notifications</h4>
                  <span className="notification-count">{notifications.length} new</span>
                </div>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${notification.type}`}>
                      <div className="notification-dot"></div>
                      <div className="notification-content">
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <button className="view-all-btn">View All Notifications</button>
                </div>
              </div>
            )}
          </div>

          <button className="settings-btn">
            <Cog6ToothIcon className="settings-icon" />
          </button>

          <div className="profile-container">
            <button
              className="profile-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="profile-info">
                <UserCircleIcon className="profile-avatar" />
                <div className="profile-text">
                  <span className="profile-name">Admin User</span>
                  <span className="profile-role">Administrator</span>
                </div>
                <ChevronDownIcon className="profile-chevron" />
              </div>
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="dropdown-item">
                  <UserCircleIcon className="dropdown-icon" />
                  <span>Profile Settings</span>
                </div>
                <div className="dropdown-item">
                  <Cog6ToothIcon className="dropdown-icon" />
                  <span>Account Settings</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout">
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;