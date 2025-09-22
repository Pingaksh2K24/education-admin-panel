import React, { useState } from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput, TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const StudentLife: React.FC = () => {
  const [formData, setFormData] = useState({
    title: 'Student Life',
    description: 'Experience vibrant campus life at Siddhivinayak College',
    activities: 'Sports, Cultural Events, Technical Festivals, Student Clubs',
    facilities: 'Library, Cafeteria, Sports Complex, Computer Labs, Hostels'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Student Life page updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Student Life</h1>
        <p>Manage student life and campus activities</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3>Student Life Content</h3>
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
                label="Activities"
                name="activities"
                value={formData.activities}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="full-width">
              <TextArea
                label="Facilities"
                name="facilities"
                value={formData.facilities}
                onChange={handleInputChange}
                rows={3}
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

export default StudentLife;