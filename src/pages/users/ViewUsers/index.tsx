import React, { useState, useEffect } from 'react';
import {
  UsersIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { EditAction, DeleteAction } from '../../../components/action/page';
import { ExportPDF } from '../../../components/buttons/page';
import { useConfirmation } from '../../../components/confirmation/useConfirmation';
import EditUserModal from '../../../features/users/view-user/edit-user';
import StatsCards from '../../../features/users/view-user/cards';
import UserFilter from '../../../features/users/view-user/filter';
import { notification } from '../../../utils';
import PageHeader from '../../../components/page-header';
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

interface DropdownOption {
  id: number;
  name: string;
  is_active: boolean;
}

interface DropdownData {
  roles: DropdownOption[];
  departments: DropdownOption[];
  status: DropdownOption[];
}

const ViewUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { showConfirmation, ConfirmationComponent } = useConfirmation();
  const [dropdownData, setDropdownData] = useState<DropdownData>({
    roles: [],
    departments: [],
    status: []
  });

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

      // Map API response to User interface and filter out soft deleted users
      const mappedUsers = Array.isArray(data) ? data
        .map((user: any, index: number) => ({
          id: user.id || index + 1,
          name: user.full_name || user.full_name || 'Unknown',
          email: user.email || '-',
          phone: user.phone || user.mobile || '-',
          role: user.role_name || '-',
          status: user.status_name || '-',
          joinDate: user.joinDate || user.createdAt || new Date().toISOString().split('T')[0],
          avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=FF4500&color=fff`,
          department: user.department_name || ''
        })) : [];
      console.log("Mapped Users:", mappedUsers); // Debug log
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

  const fetchDropdownData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/getAllDropdowns');
      if (response.ok) {
        const result = await response.json();
        setDropdownData(result.data || result);
      }
    } catch (error) {
      console.error('Failed to fetch dropdown data:', error);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    fetchDropdownData();
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (userId: number, userName: string) => {
    const confirmed = await showConfirmation({
      title: 'Delete User',
      message: `Are you sure you want to delete ${userName}? This action cannot be undone.`,
      type: 'delete',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/users/${userId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          notification.success(`${userName} deleted successfully!`);
          // Remove user from local state
          setUsers(users.filter(user => user.id !== userId));
        } else {
          const error = await response.json();
          notification.error('Failed to delete user: ' + (error.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Delete error:', error);
        notification.error('Network error. Please try again.');
      }
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="view-users-container">
      {/* Header */}
      <PageHeader
        title="User Management"
        subtitle="Manage all system users and their permissions"
        icon={<UsersIcon />}
      />

      {/* Stats Cards */}
      <StatsCards
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        adminUsers={adminUsers}
        teacherUsers={teacherUsers}
      />

      {/* Filters */}
      <UserFilter
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        roles={roles}
        onSearchChange={setSearchTerm}
        onRoleChange={setRoleFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Users Table */}
      <div className="users-table-container">
        <div className="table-header">
          <div className="table-title">
            <h3>Users Directory ({filteredUsers.length} users)</h3>
            <p className="table-subtitle">Manage system users and their access permissions</p>
          </div>
          <div className="table-actions">
            <ExportPDF size="medium">Export</ExportPDF>
          </div>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Department</th>
              <th>Contact</th>
              <th>Status</th>
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
                  <span className="user-status">
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <EditAction onClick={() => handleEditUser(user)} size="small" />
                    <DeleteAction onClick={() => handleDeleteUser(user.id, user.name)} size="small" />
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

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        user={selectedUser}
        dropdownData={dropdownData}
      />

      <ConfirmationComponent />
    </div>
  );
};

export default ViewUsers;