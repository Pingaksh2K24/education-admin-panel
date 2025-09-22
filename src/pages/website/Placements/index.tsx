import React, { useState } from 'react';
import { BriefcaseIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput, TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const Placements: React.FC = () => {
  const [formData, setFormData] = useState({
    title: 'Placements & Career',
    description: 'Excellent placement opportunities for our students',
    placementRate: '95%',
    topRecruiters: 'TCS, Infosys, Wipro, Accenture, IBM',
    averagePackage: '₹4.5 LPA',
    highestPackage: '₹12 LPA'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Placements page updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Placements</h1>
        <p>Manage placement statistics and information</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><BriefcaseIcon className="section-icon" /> Placement Content</h3>
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
              label="Placement Rate"
              name="placementRate"
              value={formData.placementRate}
              onChange={handleInputChange}
            />
            <TextInput
              label="Average Package"
              name="averagePackage"
              value={formData.averagePackage}
              onChange={handleInputChange}
            />
            <TextInput
              label="Highest Package"
              name="highestPackage"
              value={formData.highestPackage}
              onChange={handleInputChange}
            />
            <div className="full-width">
              <TextArea
                label="Top Recruiters"
                name="topRecruiters"
                value={formData.topRecruiters}
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

export default Placements;