import React, { useState } from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  AcademicCapIcon,
  UsersIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { AddButton } from '../../../components/buttons/page';
import './style.css';

interface Course {
  id: string;
  name: string;
  department: string;
  credits: number;
  faculty: string;
  semester: number;
  students: number;
  duration: string;
  status: 'Active' | 'Inactive';
  rating: number;
  description: string;
}

interface ViewCourseProps {
  onAddCourse?: () => void;
}

const ViewCourse: React.FC<ViewCourseProps> = ({ onAddCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [status, setStatus] = useState('');

  const courses: Course[] = [
    {
      id: 'CS101',
      name: 'Introduction to Computer Science',
      department: 'Computer Science',
      credits: 4,
      faculty: 'Dr. Smith',
      semester: 1,
      students: 45,
      duration: '16 weeks',
      status: 'Active',
      rating: 4.5,
      description: 'Fundamental concepts of programming and computer science'
    },
    {
      id: 'MTH101',
      name: 'Calculus I',
      department: 'Mathematics',
      credits: 3,
      faculty: 'Dr. Johnson',
      semester: 1,
      students: 38,
      duration: '16 weeks',
      status: 'Active',
      rating: 4.2,
      description: 'Introduction to differential and integral calculus'
    },
    {
      id: 'PSY101',
      name: 'Introduction to Psychology',
      department: 'Psychology',
      credits: 3,
      faculty: 'Dr. Williams',
      semester: 2,
      students: 52,
      duration: '16 weeks',
      status: 'Active',
      rating: 4.7,
      description: 'Basic principles and theories of human behavior'
    },
    {
      id: 'ENG101',
      name: 'English Literature',
      department: 'English',
      credits: 2,
      faculty: 'Dr. Brown',
      semester: 1,
      students: 29,
      duration: '16 weeks',
      status: 'Inactive',
      rating: 4.0,
      description: 'Study of classic and contemporary literary works'
    },
    {
      id: 'PHY101',
      name: 'General Physics',
      department: 'Physics',
      credits: 4,
      faculty: 'Dr. Davis',
      semester: 2,
      students: 41,
      duration: '16 weeks',
      status: 'Active',
      rating: 4.3,
      description: 'Fundamental principles of mechanics and thermodynamics'
    },
    {
      id: 'CHE101',
      name: 'General Chemistry',
      department: 'Chemistry',
      credits: 4,
      faculty: 'Dr. Wilson',
      semester: 1,
      students: 35,
      duration: '16 weeks',
      status: 'Active',
      rating: 4.1,
      description: 'Basic concepts of atomic structure and chemical bonding'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesName = courseName === '' || course.name.toLowerCase().includes(courseName.toLowerCase());
    const matchesDept = department === '' || course.department === department;
    const matchesSemester = semester === '' || course.semester.toString() === semester;
    const matchesStatus = status === '' || course.status === status;
    return matchesName && matchesDept && matchesSemester && matchesStatus;
  });

  const departments = Array.from(new Set(courses.map(c => c.department)));
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'Active').length;
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const avgRating = (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1);

  const handleClearFilters = () => {
    setCourseName('');
    setDepartment('');
    setSemester('');
    setStatus('');
  };

  return (
    <div className="view-course-enhanced">
      {/* Header */}
      <div className="course-header-enhanced">
        <div className="header-left">
          <div className="page-title-enhanced">
            <AcademicCapIcon className="title-icon-enhanced" />
            <h1>Course Management</h1>
          </div>
          <p className="page-subtitle-enhanced">Manage and monitor all academic courses</p>
        </div>
        <div className="header-actions">
          <AddButton 
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={onAddCourse}
          >
            Add New Course
          </AddButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid-enhanced">
        <div className="stat-card-enhanced">
          <div className="stat-icon-enhanced courses">
            <AcademicCapIcon className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{totalCourses}</div>
            <div className="stat-label">Total Courses</div>
          </div>
        </div>
        <div className="stat-card-enhanced">
          <div className="stat-icon-enhanced active">
            <ClockIcon className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{activeCourses}</div>
            <div className="stat-label">Active Courses</div>
          </div>
        </div>
        <div className="stat-card-enhanced">
          <div className="stat-icon-enhanced students">
            <UsersIcon className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{totalStudents}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>
        <div className="stat-card-enhanced">
          <div className="stat-icon-enhanced rating">
            <StarIcon className="w-6 h-6" />
          </div>
          <div className="stat-content">
            <div className="stat-number">{avgRating}</div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="filter-section-enhanced">
        <div className="filter-header">
          <FunnelIcon className="filter-icon" />
          <h3>Filters & Search</h3>
        </div>
        
        <div className="filter-content-enhanced">
          <div className="search-group">
            <div className="search-input-container">
              <MagnifyingGlassIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search courses by name or ID..."
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="search-input-enhanced"
              />
            </div>
          </div>
          
          <div className="filter-controls">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="filter-select-enhanced"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="filter-select-enhanced"
            >
              <option value="">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
            
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="filter-select-enhanced"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            
            <button onClick={handleClearFilters} className="clear-btn">
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="table-container-enhanced">
        <div className="table-header">
          <h3>Course Directory ({filteredCourses.length} courses)</h3>
        </div>
        
        <table className="enhanced-table">
          <thead>
            <tr>
              <th>Course Info</th>
              <th>Department</th>
              <th>Credits</th>
              <th>Faculty</th>
              <th>Students</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map(course => (
              <tr key={course.id}>
                <td>
                  <div className="course-info-cell">
                    <div className="course-id-badge">{course.id}</div>
                    <div className="course-details">
                      <div className="course-name-enhanced">{course.name}</div>
                      <div className="course-description">{course.description}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="department-badge">{course.department}</span>
                </td>
                <td>
                  <div className="credits-cell">
                    <span className="credits-number">{course.credits}</span>
                    <span className="credits-label">credits</span>
                  </div>
                </td>
                <td className="faculty-cell">{course.faculty}</td>
                <td>
                  <div className="students-cell">
                    <UsersIcon className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                </td>

                <td>
                  <div className="rating-cell">
                    <StarIcon className="w-4 h-4 star-icon" />
                    <span>{course.rating}</span>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="View Details">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button className="action-btn edit" title="Edit Course">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button className="action-btn delete" title="Delete Course">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCourses.length === 0 && (
          <div className="no-results">
            <AcademicCapIcon className="no-results-icon" />
            <h3>No Courses Found</h3>
            <p>Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCourse;