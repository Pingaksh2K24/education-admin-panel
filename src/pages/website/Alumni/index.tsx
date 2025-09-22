import React, { useState } from 'react';
import { AcademicCapIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput, TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const Alumni: React.FC = () => {
  const [formData, setFormData] = useState({
    title: 'Alumni Network',
    description: 'Connect with our successful alumni worldwide',
    totalAlumni: '10,000+',
    successStories: 'Featured success stories of our alumni'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Alumni page updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Alumni Network</h1>
        <p>Manage alumni information and network</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><AcademicCapIcon className="section-icon" /> Alumni Content</h3>
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
            <TextInput
              label="Total Alumni"
              name="totalAlumni"
              value={formData.totalAlumni}
              onChange={handleInputChange}
            />
            <div className="full-width">
              <TextArea
                label="Success Stories"
                name="successStories"
                value={formData.successStories}
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

export default Alumni;