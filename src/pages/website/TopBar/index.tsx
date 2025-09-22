import React, { useState } from 'react';
import { PhoneIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import './style.css';

const TopBar: React.FC = () => {
  const [formData, setFormData] = useState({
    phone: '+91 9876543210',
    email: 'info@siddhivinayakcollege.edu',
    address: 'Mumbai, Maharashtra'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Top Bar settings updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Top Bar Settings</h1>
        <p>Manage contact information displayed in the top bar</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><PhoneIcon className="section-icon" /> Contact Information</h3>
          </div>
          <div className="form-grid">
            <TextInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
            />
            <TextInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
            />
            <div className="full-width">
              <TextInput
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
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

export default TopBar;