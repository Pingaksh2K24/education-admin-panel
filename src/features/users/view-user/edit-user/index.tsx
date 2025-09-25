import React, { useState } from 'react';
import { TextInput, SingleSelectDropDown, DatePicker } from '../../../../components/input';
import Modal from '../../../../components/modal';
import { PhotoIcon, KeyIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { notification } from '../../../../utils';
import './style.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
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

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  dropdownData: DropdownData;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  dropdownData
}) => {
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    dob: '',
    gender: '',
    address: '',
    role: '',
    department: '',
    status: '',
    password: '',
    confirmPassword: '',
    image: null as File | null
  });
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (user && isOpen) {
      fetchUserById(user.id);
    }
  }, [user, isOpen]);

  const fetchUserById = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        
        setEditFormData({
          name: userData.full_name || userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          alternatePhone: userData.alternate_phone || '',
          dob: userData.dob || '',
          gender: userData.gender_id?.toString() || '',
          address: userData.address || '',
          role: userData.role_id?.toString() || '',
          department: userData.department_id?.toString() || '',
          status: userData.status_id?.toString() || '',
          password: '',
          confirmPassword: '',
          image: null
        });
        
        setEditImagePreview(userData.profile_image || userData.avatar);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setEditFormData(prev => ({ ...prev, image: file }));
          setEditImagePreview(result.url || URL.createObjectURL(file));
        } else {
          setEditFormData(prev => ({ ...prev, image: file }));
          setEditImagePreview(URL.createObjectURL(file));
        }
      } catch (error) {
        console.error('Upload error:', error);
        setEditFormData(prev => ({ ...prev, image: file }));
        setEditImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleClose = () => {
    setEditImagePreview(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit User"
      size="large"
    >
      {user && (
        <div className="edit-user-form">
          <div className="form-sections">
            {/* Personal Information */}
            <div className="form-section">
              <h4 className="section-title">
                <UserIcon className="section-icon" />
                Personal Information
              </h4>
              <div className="form-grid">
                <TextInput
                  label="Full Name *"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  placeholder="Enter full name"
                />
                <TextInput
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                  placeholder="Enter email address"
                />
                <TextInput
                  label="Phone Number *"
                  name="phone"
                  type="tel"
                  value={editFormData.phone}
                  onChange={handleEditInputChange}
                  placeholder="Enter phone number"
                />
                <TextInput
                  label="Alternate Phone Number"
                  name="alternatePhone"
                  type="tel"
                  value={editFormData.alternatePhone}
                  onChange={handleEditInputChange}
                  placeholder="Enter alternate phone number"
                />
                <DatePicker
                  label="Date of Birth"
                  name="dob"
                  value={editFormData.dob}
                  onChange={handleEditInputChange}
                />
                <SingleSelectDropDown
                  label="Gender"
                  name="gender"
                  value={editFormData.gender}
                  onChange={handleEditInputChange}
                  options={[
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                    { value: '3', label: 'Other' }
                  ]}
                  placeholder="Select Gender"
                />
                <TextInput
                  label="Address"
                  name="address"
                  value={editFormData.address}
                  onChange={handleEditInputChange}
                  placeholder="Enter address"
                />
              </div>
            </div>
            
            {/* Role & Access */}
            <div className="form-section">
              <h4 className="section-title">
                <ShieldCheckIcon className="section-icon" />
                Role & Access
              </h4>
              <div className="form-grid">
                <SingleSelectDropDown
                  label="User Role *"
                  name="role"
                  value={editFormData.role}
                  onChange={handleEditInputChange}
                  options={dropdownData?.roles
                    ?.filter(role => role.is_active)
                    ?.map(role => ({ value: role.id.toString(), label: role.name })) || []
                  }
                  placeholder="Select Role"
                />
                <SingleSelectDropDown
                  label="Department"
                  name="department"
                  value={editFormData.department}
                  onChange={handleEditInputChange}
                  options={dropdownData?.departments
                    ?.filter(dept => dept.is_active)
                    ?.map(dept => ({ value: dept.id.toString(), label: dept.name })) || []
                  }
                  placeholder="Select Department"
                />
                <SingleSelectDropDown
                  label="Status"
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditInputChange}
                  options={dropdownData?.status
                    ?.filter(status => status.is_active)
                    ?.map(status => ({ value: status.id.toString(), label: status.name })) || []
                  }
                  placeholder="Select Status"
                />
              </div>
            </div>  
            
            {/* Profile Photo */}
            <div className="form-section">
              <h4 className="section-title">
                <PhotoIcon className="section-icon" />
                Profile Photo
              </h4>
              <div className="photo-upload-container">
                <div className="photo-preview">
                  {editImagePreview ? (
                    <img src={editImagePreview} alt="Preview" className="preview-image" />
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
                    id="editImage"
                    name="image"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="file-input"
                  />
                  <label htmlFor="editImage" className="file-label">
                    <PhotoIcon className="w-4 h-4" />
                    Change Photo
                  </label>
                  <p className="file-help">Upload a new profile photo (JPG, PNG, max 5MB)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn-save">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditUserModal;