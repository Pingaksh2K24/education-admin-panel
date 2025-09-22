import React, { useState } from 'react';
import { SpeakerWaveIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const AnnouncementBar: React.FC = () => {
  const [formData, setFormData] = useState({
    text: 'Admissions Open for Academic Year 2024-25',
    isActive: true,
    backgroundColor: '#ff6b35',
    textColor: '#ffffff'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Announcement Bar updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Announcement Bar</h1>
        <p>Manage announcement messages displayed at the top of website</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><SpeakerWaveIcon className="section-icon" /> Announcement Settings</h3>
          </div>
          <div className="form-grid">
            <div className="full-width">
              <TextArea
                label="Announcement Text"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="Enter announcement text"
                rows={3}
                required
              />
            </div>
            <div className="form-group">
              <label>Background Color</label>
              <input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Text Color</label>
              <input
                type="color"
                name="textColor"
                value={formData.textColor}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  style={{ marginRight: '8px' }}
                />
                Show Announcement Bar
              </label>
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

export default AnnouncementBar;