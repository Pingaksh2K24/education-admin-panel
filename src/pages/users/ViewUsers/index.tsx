import React, { useState, useEffect } from 'react';
import {
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { ViewAction, EditAction, DeleteAction } from '../../../components/action/page';
import { TextInput, SingleSelectDropDown } from '../../../components/input';
import './style.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Teacher' | 'Student' | 'Staff';
  status: 'Active' | 'Inactive';
  joinDate: string;
  avatar: string;
  department?: string;
}

const ViewUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/auth/getAllUserList');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      
      // Map API response to User interface
      const mappedUsers = Array.isArray(data) ? data.map((user: any, index: number) => ({
        id: user.id || index + 1,
        name: user.full_name || user.full_name || 'Unknown',
        email: user.email || '',
        phone: user.phone || user.mobile || '',
        role: user.role || 'Student',
        status: user.status || 'Active',
        joinDate: user.joinDate || user.createdAt || new Date().toISOString().split('T')[0],
        avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=FF4500&color=fff`,
        department: user.department || ''
      })) : [];
      
      setUsers(mappedUsers);
    } catch (err) {
      setError('Failed to load users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roles = Array.from(new Set(users.map(u => u.role)));
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const adminUsers = users.filter(u => u.role === 'Admin').length;
  const teacherUsers = users.filter(u => u.role === 'Teacher').length;

  return (
    <div className="view-users-container">
      {/* Header */}
      <div className="users-header">
        <div className="header-content">
          <h1 className="page-title">
            <UsersIcon className="title-icon" />
            User Management
          </h1>
          <p className="page-subtitle">Manage all system users and their permissions</p>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Filters */}
      <div className="users-filters">
        <div className="filter-header">
          <FunnelIcon className="filter-icon" />
          <h3 className="filter-title">Filters & Search</h3>
        </div>
        <div className="filter-content">
          <div className="search-group">
            <TextInput
              label=""
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users by name or email..."
            />
          </div>
          <div className="filter-group">
            <SingleSelectDropDown
              label=""
              name="roleFilter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={roles.map(role => ({ value: role, label: role }))}
              placeholder="All Roles"
            />
          </div>
          <div className="filter-group">
            <SingleSelectDropDown
              label=""
              name="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
              ]}
              placeholder="All Status"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <div className="table-header">
          <div className="table-title">
            <h3>Users Directory ({filteredUsers.length} users)</h3>
            <p className="table-subtitle">Manage system users and their access permissions</p>
          </div>
          <div className="table-actions">
            <button className="export-btn">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          </div>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Department</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info-cell">
                    <div className="user-avatar-container">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className={`status-indicator ${user.status.toLowerCase()}`}></div>
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    <ShieldCheckIcon className="role-icon" />
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="department-cell">
                    <span className="department-name">{user.department || '-'}</span>
                  </div>
                </td>
                <td>
                  <div className="contact-cell">
                    <div className="contact-item">
                      <EnvelopeIcon className="contact-icon" />
                      <span>{user.email}</span>
                    </div>
                    <div className="contact-item">
                      <PhoneIcon className="contact-icon" />
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <ViewAction onClick={() => console.log('View user:', user.id)} size="small" />
                    <EditAction onClick={() => console.log('Edit user:', user.id)} size="small" />
                    <DeleteAction onClick={() => console.log('Delete user:', user.id)} size="small" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="no-results">
            <div className="loading-spinner"></div>
            <h3>Loading Users...</h3>
            <p>Please wait while we fetch the user data.</p>
          </div>
        )}

        {error && (
          <div className="no-results error">
            <UserCircleIcon className="no-results-icon" />
            <h3>Error Loading Users</h3>
            <p>{error}</p>
            <button onClick={fetchUsers} className="retry-btn">Retry</button>
          </div>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <div className="no-results">
            <UserCircleIcon className="no-results-icon" />
            <h3>No Users Found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;