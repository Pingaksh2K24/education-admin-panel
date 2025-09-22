import React, { useState } from 'react';
import { DocumentTextIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput, TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const Admission: React.FC = () => {
  const [formData, setFormData] = useState({
    title: 'Admissions 2024-25',
    description: 'Join our prestigious institution',
    eligibility: 'Minimum 50% marks in 12th standard',
    applicationDeadline: '2024-06-30',
    fees: 'Annual fees: ₹50,000',
    documents: 'Mark sheets, Transfer certificate, Passport size photos'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Admission page updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Admission Information</h1>
        <p>Manage admission details and requirements</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><DocumentTextIcon className="section-icon" /> Admission Content</h3>
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
                label="Eligibility Criteria"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <TextInput
              label="Application Deadline"
              name="applicationDeadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
            />
            <TextInput
              label="Fee Structure"
              name="fees"
              value={formData.fees}
              onChange={handleInputChange}
            />
            <div className="full-width">
              <TextArea
                label="Required Documents"
                name="documents"
                value={formData.documents}
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

export default Admission;