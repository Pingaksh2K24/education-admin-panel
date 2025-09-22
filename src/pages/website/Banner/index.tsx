import React, { useState } from 'react';
import { GlobeAltIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput } from '../../../components/input';
import './style.css';


const Banner: React.FC = () => {
  const [formData, setFormData] = useState({
    title: 'Welcome to Siddhivinayak College',
    subtitle: 'Excellence in Education Since 1995',
    buttonText: 'Apply Now',
    buttonLink: '/admission',
    backgroundImage: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Banner updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Banner Section</h1>
        <p>Manage main banner content and call-to-action</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><GlobeAltIcon className="section-icon" /> Banner Content</h3>
          </div>
          <div className="form-grid">
            <div className="full-width">
              <TextInput
                label="Banner Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter banner title"
                required
              />
            </div>
            <div className="full-width">
              <TextInput
                label="Banner Subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Enter banner subtitle"
              />
            </div>
            <TextInput
              label="Button Text"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleInputChange}
              placeholder="Enter button text"
            />
            <TextInput
              label="Button Link"
              name="buttonLink"
              value={formData.buttonLink}
              onChange={handleInputChange}
              placeholder="Enter button link"
            />
            <div className="full-width">
              <TextInput
                label="Background Image URL"
                name="backgroundImage"
                type="url"
                value={formData.backgroundImage}
                onChange={handleInputChange}
                placeholder="Enter background image URL"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn"><DocumentDuplicateIcon className="btn-icon" /> Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default Banner;