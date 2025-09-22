import React, { useState } from 'react';
import { InformationCircleIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput, TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const AboutUs: React.FC = () => {
  const [formData, setFormData] = useState({
    title: 'About Siddhivinayak College',
    mission: 'To provide quality education and shape future leaders',
    vision: 'To be a leading educational institution',
    history: 'Established in 1995, we have been serving students for over 25 years',
    principalMessage: 'Welcome message from Principal'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('About Us updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>About Us</h1>
        <p>Manage about us page content</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><InformationCircleIcon className="section-icon" /> About Content</h3>
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
                label="Mission"
                name="mission"
                value={formData.mission}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="full-width">
              <TextArea
                label="Vision"
                name="vision"
                value={formData.vision}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="full-width">
              <TextArea
                label="History"
                name="history"
                value={formData.history}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div className="full-width">
              <TextArea
                label="Principal Message"
                name="principalMessage"
                value={formData.principalMessage}
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

export default AboutUs;