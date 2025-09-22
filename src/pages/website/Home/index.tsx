import React, { useState } from 'react';
import { HomeIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput, TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    welcomeText: 'Welcome to Siddhivinayak College',
    aboutText: 'Leading institution in higher education',
    featuresTitle: 'Why Choose Us',
    feature1: 'Quality Education',
    feature2: 'Experienced Faculty',
    feature3: 'Modern Infrastructure'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Home page updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Home Page</h1>
        <p>Manage home page content and features</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><HomeIcon className="section-icon" /> Home Content</h3>
          </div>
          <div className="form-grid">
            <div className="full-width">
              <TextInput
                label="Welcome Text"
                name="welcomeText"
                value={formData.welcomeText}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="full-width">
              <TextArea
                label="About Text"
                name="aboutText"
                value={formData.aboutText}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="full-width">
              <TextInput
                label="Features Title"
                name="featuresTitle"
                value={formData.featuresTitle}
                onChange={handleInputChange}
              />
            </div>
            <TextInput
              label="Feature 1"
              name="feature1"
              value={formData.feature1}
              onChange={handleInputChange}
            />
            <TextInput
              label="Feature 2"
              name="feature2"
              value={formData.feature2}
              onChange={handleInputChange}
            />
            <TextInput
              label="Feature 3"
              name="feature3"
              value={formData.feature3}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-actions">
          <SaveButton type="submit" icon={<DocumentDuplicateIcon />}>Save Changes</SaveButton>
        </div>
      </form>
    </div>
  );
};

export default Home;