import React, { useState } from 'react';
import './style.css';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CalendarIcon,
  PhotoIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { SubmitButton, CancelButton } from '../../../components/buttons/page';
interface FacultyForm {
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  qualification: string;
  experience: string;
  dateOfJoining: string;
  address: string;
  emergencyContact: string;
  specialization: string;
  image: File | null;
}

const AddFaculty: React.FC = () => {
  const [formData, setFormData] = useState<FacultyForm>({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    qualification: '',
    experience: '',
    dateOfJoining: '',
    address: '',
    emergencyContact: '',
    specialization: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Faculty data:', formData);
      setIsSubmitting(false);
      // Reset form or show success message
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      qualification: '',
      experience: '',
      dateOfJoining: '',
      address: '',
      emergencyContact: '',
      specialization: '',
      image: null
    });
    setImagePreview(null);
  };

  return (
    <div className="add-faculty-container">
      <div className="form-header">
        <div className="header-content">
          <div className="form-title">
            <UserIcon className="form-title-icon" />
            <h2>Add New Faculty Member</h2>
          </div>
          <p className="form-subtitle">Fill in the details to add a new faculty member to the institution</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="faculty-form">
        <div className="form-sections">
          {/* Personal Information */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-title">
                <UserIcon className="section-icon" />
                <h3>Personal Information</h3>
              </div>
              <div className="section-badge">Step 1</div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <div className="input-with-icon">
                  <EnvelopeIcon className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <div className="input-with-icon">
                  <PhoneIcon className="input-icon" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Enter emergency contact"
                />
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete address"
                rows={3}
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-title">
                <AcademicCapIcon className="section-icon" />
                <h3>Professional Information</h3>
              </div>
              <div className="section-badge">Step 2</div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <div className="input-with-icon">
                  <BuildingOfficeIcon className="input-icon" />
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="designation">Designation *</label>
                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Designation</option>
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Senior Lecturer">Senior Lecturer</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="qualification">Highest Qualification *</label>
                <div className="input-with-icon">
                  <DocumentTextIcon className="input-icon" />
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    placeholder="e.g., Ph.D in Computer Science"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 5 years"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfJoining">Date of Joining</label>
                <div className="input-with-icon">
                  <CalendarIcon className="input-icon" />
                  <input
                    type="date"
                    id="dateOfJoining"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="specialization">Specialization</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="Area of expertise"
                />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-title">
                <PhotoIcon className="section-icon" />
                <h3>Profile Photo</h3>
              </div>
              <div className="section-badge">Step 3</div>
            </div>
            <div className="photo-upload-container">
              <div className="upload-area">
                <div className="photo-preview">
                  {imagePreview ? (
                    <div className="preview-wrapper">
                      <img src={imagePreview} alt="Preview" className="preview-image" />
                      <div className="preview-overlay">
                        <button type="button" className="change-photo-btn" onClick={() => document.getElementById('image')?.click()}>
                          <PhotoIcon className="btn-icon" />
                          Change Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-placeholder" onClick={() => document.getElementById('image')?.click()}>
                      <div className="upload-icon">
                        <PhotoIcon className="placeholder-icon" />
                      </div>
                      <div className="upload-text">
                        <h4>Upload Profile Photo</h4>
                        <p>Click to browse or drag and drop</p>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
              </div>
              <div className="upload-info">
                <div className="info-item">
                  <CheckCircleIcon className="info-icon" />
                  <span>Supported formats: JPG, PNG, GIF</span>
                </div>
                <div className="info-item">
                  <CheckCircleIcon className="info-icon" />
                  <span>Maximum file size: 5MB</span>
                </div>
                <div className="info-item">
                  <CheckCircleIcon className="info-icon" />
                  <span>Recommended size: 400x400px</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <CancelButton type="button" onClick={handleReset}>
            Reset Form
          </CancelButton>
          <SubmitButton
            loading={isSubmitting}
            icon={<CheckCircleIcon className="w-4 h-4" />}
          >
            {isSubmitting ? 'Adding Faculty...' : 'Add Faculty'}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default AddFaculty;