import React, { useState } from 'react';
import { 
  UserPlusIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  PhotoIcon,
  CheckCircleIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { SubmitButton, CancelButton } from '../../../components/buttons/page';
import { TextInput, SingleSelectDropDown } from '../../../components/input';
import './style.css';

interface UserForm {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  password: string;
  confirmPassword: string;
  status: string;
  image: File | null;
}

const AddUsers: React.FC = () => {
  const [formData, setFormData] = useState<UserForm>({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    password: '',
    confirmPassword: '',
    status: 'Active',
    image: null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<UserForm>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof UserForm]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        
        const response = await fetch('http://localhost:3000/api/auth/upload', {
          method: 'POST',
          body: formDataUpload
        });
        
        if (response.ok) {
          const result = await response.json();
          setFormData(prev => ({ ...prev, image: file }));
          setImagePreview(result.url || URL.createObjectURL(file));
        } else {
          console.error('Upload failed');
          // Fallback to local preview
          setFormData(prev => ({ ...prev, image: file }));
          setImagePreview(URL.createObjectURL(file));
        }
      } catch (error) {
        console.error('Upload error:', error);
        // Fallback to local preview
        setFormData(prev => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserForm> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          department: formData.department,
          password: formData.password,
          status: formData.status
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('User created successfully:', result);
        handleReset();
        alert('User added successfully!');
      } else {
        const error = await response.json();
        console.error('Registration failed:', error);
        alert('Failed to add user: ' + (error.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      password: '',
      confirmPassword: '',
      status: 'Active',
      image: null
    });
    setImagePreview(null);
    setErrors({});
  };

  return (
    <div className="add-users-container">
      <div className="form-header">
        <div className="form-title">
          <UserPlusIcon className="form-title-icon" />
          <h2>Add New User</h2>
        </div>
        <p className="form-subtitle">Create a new user account with appropriate permissions</p>
      </div>

      <form onSubmit={handleSubmit} className="users-form">
        <div className="form-sections">
          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-title">
              <UserIcon className="section-icon" />
              Personal Information
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <TextInput
                  label="Full Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="form-group">
                <TextInput
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <TextInput
                  label="Phone Number *"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
          </div>

          {/* Role & Access */}
          <div className="form-section">
            <h3 className="section-title">
              <ShieldCheckIcon className="section-icon" />
              Role & Access
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <SingleSelectDropDown
                  label="User Role *"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  options={[
                    { value: 'Admin', label: 'Admin' },
                    { value: 'Teacher', label: 'Teacher' },
                    { value: 'Student', label: 'Student' },
                    { value: 'Staff', label: 'Staff' }
                  ]}
                  placeholder="Select Role"
                  required
                />
                {errors.role && <span className="error-message">{errors.role}</span>}
              </div>
              <div className="form-group">
                <SingleSelectDropDown
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  options={[
                    { value: 'Administration', label: 'Administration' },
                    { value: 'Computer Science', label: 'Computer Science' },
                    { value: 'Mathematics', label: 'Mathematics' },
                    { value: 'Physics', label: 'Physics' },
                    { value: 'Chemistry', label: 'Chemistry' },
                    { value: 'Engineering', label: 'Engineering' },
                    { value: 'Library', label: 'Library' },
                    { value: 'Finance', label: 'Finance' }
                  ]}
                  placeholder="Select Department"
                />
              </div>
              <div className="form-group">
                <SingleSelectDropDown
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  options={[
                    { value: 'Active', label: 'Active' },
                    { value: 'Inactive', label: 'Inactive' }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="form-section">
            <h3 className="section-title">
              <KeyIcon className="section-icon" />
              Security
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <TextInput
                  label="Password *"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              <div className="form-group">
                <TextInput
                  label="Confirm Password *"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  required
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="form-section">
            <h3 className="section-title">
              <PhotoIcon className="section-icon" />
              Profile Photo
            </h3>
            <div className="photo-upload-container">
              <div className="photo-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                ) : (
                  <div className="preview-placeholder">
                    <PhotoIcon className="placeholder-icon" />
                    <span>No photo selected</span>
                  </div>
                )}
              </div>
              <div className="photo-upload-controls">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="image" className="file-label">
                  <PhotoIcon className="w-4 h-4" />
                  Choose Photo
                </label>
                <p className="file-help">Upload a profile photo (JPG, PNG, max 5MB)</p>
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
            {isSubmitting ? 'Adding User...' : 'Add User'}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default AddUsers;