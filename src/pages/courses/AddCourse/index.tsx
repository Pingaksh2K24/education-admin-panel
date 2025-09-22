import React, { useState } from 'react';
import { PlusIcon, BookOpenIcon, ClockIcon, BuildingOfficeIcon, UserGroupIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import './style.css';

interface CourseForm {
  name: string;
  code: string;
  duration: string;
  department: string;
  description: string;
  credits: string;
  fees: string;
  capacity: string;
}

const AddCourse: React.FC = () => {
  const [formData, setFormData] = useState<CourseForm>({
    name: '',
    code: '',
    duration: '',
    department: '',
    description: '',
    credits: '',
    fees: '',
    capacity: ''
  });

  const [errors, setErrors] = useState<Partial<CourseForm>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CourseForm]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CourseForm> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Course name is required';
    if (!formData.code.trim()) newErrors.code = 'Course code is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.credits.trim()) newErrors.credits = 'Credits are required';
    if (!formData.capacity.trim()) newErrors.capacity = 'Capacity is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Course added:', formData);
      // Reset form
      setFormData({
        name: '', code: '', duration: '', department: '',
        description: '', credits: '', fees: '', capacity: ''
      });
    }
  };

  return (
    <div className="add-course-container">
      <div className="form-header">
        <div className="header-badge">
          <PlusIcon className="badge-icon" />
          <span>New Course</span>
        </div>
        <h2 className="form-title">Add New Course</h2>
        <p className="form-subtitle">Create a new academic course with all necessary details and requirements</p>
      </div>

      <div className="form-wrapper">
        <form className="course-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">
              <BookOpenIcon className="label-icon" />
              Course Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Computer Science Engineering"
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <DocumentTextIcon className="label-icon" />
              Course Code *
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="e.g., CSE101"
              className={`form-input ${errors.code ? 'error' : ''}`}
            />
            {errors.code && <span className="error-message">{errors.code}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <ClockIcon className="label-icon" />
              Duration *
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className={`form-input ${errors.duration ? 'error' : ''}`}
            >
              <option value="">Select Duration</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5 Years">5 Years</option>
            </select>
            {errors.duration && <span className="error-message">{errors.duration}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <BuildingOfficeIcon className="label-icon" />
              Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={`form-input ${errors.department ? 'error' : ''}`}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electronics">Electronics</option>
              <option value="Information Technology">Information Technology</option>
            </select>
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Credits *
            </label>
            <input
              type="number"
              name="credits"
              value={formData.credits}
              onChange={handleInputChange}
              placeholder="e.g., 120"
              className={`form-input ${errors.credits ? 'error' : ''}`}
            />
            {errors.credits && <span className="error-message">{errors.credits}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <UserGroupIcon className="label-icon" />
              Student Capacity *
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="e.g., 60"
              className={`form-input ${errors.capacity ? 'error' : ''}`}
            />
            {errors.capacity && <span className="error-message">{errors.capacity}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Annual Fees</label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleInputChange}
              placeholder="e.g., 50000"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label className="form-label">Course Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide a detailed description of the course..."
            className="form-textarea"
            rows={4}
          />
        </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <PlusIcon className="btn-icon" />
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;