import React from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { TextInput, SingleSelectDropDown } from '../../../../components/input';
import './style.css';

interface UserFilterProps {
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  roles: string[];
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({
  searchTerm,
  roleFilter,
  statusFilter,
  roles,
  onSearchChange,
  onRoleChange,
  onStatusChange
}) => {
  return (
    <div className="users-filters">
      <div className="filter-header">
        <FunnelIcon className="filter-icon" />
        <h3 className="filter-title">Filters & Search</h3>
      </div>
      <div className="filter-content">
        <div className="search-group">
          <label>Search Users</label>
          <TextInput
            label=""
            name="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search users by name or email..."
          />
        </div>
        <div className="filter-group">
          <label>Filter by Role</label>
          <SingleSelectDropDown
            label=""
            name="roleFilter"
            value={roleFilter}
            onChange={(e) => onRoleChange(e.target.value)}
            options={roles.map(role => ({ value: role, label: role }))}
            placeholder="All Roles"
          />
        </div>
        <div className="filter-group">
          <label>Filter by Status</label>
          <SingleSelectDropDown
            label=""
            name="statusFilter"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' }
            ]}
            placeholder="All Status"
          />
        </div>
      </div>
    </div>
  );
};

export default UserFilter;