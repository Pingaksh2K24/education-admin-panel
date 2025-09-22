import React, { useState } from 'react';
import { StarIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput, TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const Hero: React.FC = () => {
  const [formData, setFormData] = useState({
    heading: 'Shape Your Future with Quality Education',
    description: 'Join thousands of successful graduates who started their journey at Siddhivinayak College',
    primaryButtonText: 'Explore Courses',
    primaryButtonLink: '/courses',
    secondaryButtonText: 'Virtual Tour',
    secondaryButtonLink: '/tour',
    videoUrl: '',
    heroImage: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Hero section updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Hero Section</h1>
        <p>Manage hero section content and media</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><StarIcon className="section-icon" /> Hero Content</h3>
          </div>
          <div className="form-grid">
            <div className="full-width">
              <TextInput
                label="Main Heading"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                placeholder="Enter main heading"
                required
              />
            </div>
            <div className="full-width">
              <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                rows={3}
              />
            </div>
            <TextInput
              label="Primary Button Text"
              name="primaryButtonText"
              value={formData.primaryButtonText}
              onChange={handleInputChange}
              placeholder="Enter primary button text"
            />
            <TextInput
              label="Primary Button Link"
              name="primaryButtonLink"
              value={formData.primaryButtonLink}
              onChange={handleInputChange}
              placeholder="Enter primary button link"
            />
            <TextInput
              label="Secondary Button Text"
              name="secondaryButtonText"
              value={formData.secondaryButtonText}
              onChange={handleInputChange}
              placeholder="Enter secondary button text"
            />
            <TextInput
              label="Secondary Button Link"
              name="secondaryButtonLink"
              value={formData.secondaryButtonLink}
              onChange={handleInputChange}
              placeholder="Enter secondary button link"
            />
            <TextInput
              label="Hero Image URL"
              name="heroImage"
              type="url"
              value={formData.heroImage}
              onChange={handleInputChange}
              placeholder="Enter hero image URL"
            />
            <TextInput
              label="Video URL"
              name="videoUrl"
              type="url"
              value={formData.videoUrl}
              onChange={handleInputChange}
              placeholder="Enter video URL"
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

export default Hero;