import React, { useState } from 'react';
import './style.css';
import './style.css';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface Faculty {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  qualification: string;
  experience: string;
  image: string;
  status: 'Active' | 'Inactive';
}

const ViewFaculty: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');

  const facultyData: Faculty[] = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@college.edu',
      phone: '+91 9876543210',
      department: 'Computer Science',
      designation: 'Professor',
      qualification: 'Ph.D in Computer Science',
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@college.edu',
      phone: '+91 9876543211',
      department: 'Electronics',
      designation: 'Associate Professor',
      qualification: 'Ph.D in Electronics',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Prof. Amit Patel',
      email: 'amit.patel@college.edu',
      phone: '+91 9876543212',
      department: 'Mechanical',
      designation: 'Assistant Professor',
      qualification: 'M.Tech in Mechanical',
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Dr. Sunita Verma',
      email: 'sunita.verma@college.edu',
      phone: '+91 9876543213',
      department: 'Mathematics',
      designation: 'Professor',
      qualification: 'Ph.D in Mathematics',
      experience: '18 years',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Prof. Vikram Singh',
      email: 'vikram.singh@college.edu',
      phone: '+91 9876543214',
      department: 'Civil',
      designation: 'Associate Professor',
      qualification: 'M.Tech in Civil Engineering',
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      status: 'Inactive'
    },
    {
      id: 6,
      name: 'Dr. Kavita Joshi',
      email: 'kavita.joshi@college.edu',
      phone: '+91 9876543215',
      department: 'Physics',
      designation: 'Assistant Professor',
      qualification: 'Ph.D in Physics',
      experience: '6 years',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      status: 'Active'
    }
  ];

  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !departmentFilter || faculty.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(facultyData.map(f => f.department)));

  return (
    <div className="view-faculty-container">
      <div className="faculty-header">
        <div className="header-content">
          <h1 className="page-title">
            <UserGroupIcon className="title-icon" />
            Faculty Directory
          </h1>
          <p className="page-subtitle">Manage and view all faculty members</p>
        </div>
      </div>

      <div className="faculty-stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <UserGroupIcon className="icon" />
          </div>
          <div className="stat-info">
            <h3>{facultyData.length}</h3>
            <p>Total Faculty</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <BuildingOfficeIcon className="icon" />
          </div>
          <div className="stat-info">
            <h3>{departments.length}</h3>
            <p>Departments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <AcademicCapIcon className="icon" />
          </div>
          <div className="stat-info">
            <h3>{facultyData.filter(f => f.status === 'Active').length}</h3>
            <p>Active Faculty</p>
          </div>
        </div>
      </div>

      <div className="faculty-filters">
        <div className="filter-header">
          <FunnelIcon className="filter-icon" />
          <h3 className="filter-title">Filters & Search</h3>
        </div>
        
        <div className="filter-content">
          <div className="search-group">
            <div className="search-input-container">
              <MagnifyingGlassIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search faculty by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          <div className="filter-group">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="faculty-table-container">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map(faculty => (
                <tr key={faculty.id}>
                  <td>
                    <img src={faculty.image} alt={faculty.name} className="table-avatar" />
                  </td>
                  <td className="faculty-name-cell">{faculty.name}</td>
                  <td>{faculty.department}</td>
                  <td>{faculty.designation}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.phone}</td>
                  <td>
                    <span className={`table-status ${faculty.status.toLowerCase()}`}>
                      {faculty.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="action-btn edit">
                        <PencilIcon className="action-icon" />
                      </button>
                      <button className="action-btn delete">
                        <TrashIcon className="action-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={`faculty-grid ${viewMode}`}>
          {filteredFaculty.map(faculty => (
            <div key={faculty.id} className="faculty-card">
              <div className="faculty-image">
                <img src={faculty.image} alt={faculty.name} />
                <div className={`status-badge ${faculty.status.toLowerCase()}`}>
                  {faculty.status}
                </div>
              </div>
              <div className="faculty-info">
                <h3 className="faculty-name">{faculty.name}</h3>
                <p className="faculty-designation">{faculty.designation}</p>
                <div className="faculty-details">
                  <div className="detail-item">
                    <BuildingOfficeIcon className="detail-icon" />
                    <span>{faculty.department}</span>
                  </div>
                  <div className="detail-item">
                    <EnvelopeIcon className="detail-icon" />
                    <span>{faculty.email}</span>
                  </div>
                  <div className="detail-item">
                    <PhoneIcon className="detail-icon" />
                    <span>{faculty.phone}</span>
                  </div>
                  <div className="detail-item">
                    <AcademicCapIcon className="detail-icon" />
                    <span>{faculty.qualification}</span>
                  </div>
                </div>
                <div className="faculty-actions">
                  <button className="action-btn edit">
                    <PencilIcon className="action-icon" />
                    Edit
                  </button>
                  <button className="action-btn delete">
                    <TrashIcon className="action-icon" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredFaculty.length === 0 && (
        <div className="no-results">
          <UserGroupIcon className="no-results-icon" />
          <h3>No Faculty Found</h3>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ViewFaculty;