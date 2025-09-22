import React, { useState } from 'react';
import { AcademicCapIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { TextInput, TextArea } from '../../../components/input';
import { SaveButton } from '../../../components/buttons/page';
import '../TopBar/style.css';

const Academic: React.FC = () => {
  const [formData, setFormData] = useState({
    title: 'Academic Programs',
    description: 'Explore our comprehensive academic programs',
    ugPrograms: 'Bachelor of Arts, Bachelor of Science, Bachelor of Commerce',
    pgPrograms: 'Master of Arts, Master of Science, Master of Commerce',
    academicCalendar: '2024-25 Academic Calendar',
    examSchedule: 'Semester Examination Schedule'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Academic page updated successfully!');
  };

  return (
    <div className="website-section">
      <div className="page-header">
        <h1>Academic Programs</h1>
        <p>Manage academic programs and schedules</p>
      </div>

      <form onSubmit={handleSubmit} className="website-form">
        <div className="form-section">
          <div className="section-header">
            <h3><AcademicCapIcon className="section-icon" /> Academic Content</h3>
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
                label="Undergraduate Programs"
                name="ugPrograms"
                value={formData.ugPrograms}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div className="full-width">
              <TextArea
                label="Postgraduate Programs"
                name="pgPrograms"
                value={formData.pgPrograms}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <TextInput
              label="Academic Calendar"
              name="academicCalendar"
              value={formData.academicCalendar}
              onChange={handleInputChange}
            />
            <TextInput
              label="Exam Schedule"
              name="examSchedule"
              value={formData.examSchedule}
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

export default Academic;