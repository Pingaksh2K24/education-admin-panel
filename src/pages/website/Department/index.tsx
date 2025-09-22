import React, { useState } from 'react';
import { BuildingOfficeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput, TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const Department: React.FC = () => {
  const [formData, setFormData] = useState({
    title: 'Our Departments',
    description: 'Explore our academic departments',
    departments: 'Computer Science, Electronics, Mechanical, Civil, Mathematics, Physics, Chemistry'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Department page updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Departments</h1>
        <p>Manage department information</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><BuildingOfficeIcon className="section-icon" /> Department Content</h3>
          </div>
          <div className="form-grid">
            <div className="full-width">
              <TextInput
                label="Page Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="full-width">
              <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="full-width">
              <TextArea
                label="Departments List"
                name="departments"
                value={formData.departments}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
          </div>
        </div>
        <div className="form-actions">
          <SaveButton type="submit" icon={<DocumentDuplicateIcon />}>Save Changes</SaveButton>
        </div>
      </form>
    </div>
  );
};

export default Department;