import React, { useState } from 'react';
import { 
  PhotoIcon, 
  CloudArrowUpIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import './style.css';

const AddImage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Events',
    description: '',
    imageFile: null as File | null
  });
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const categories = ['Events', 'Campus', 'Sports', 'Academic', 'Cultural'];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null }));
    setPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="add-image-page">
      <div className="page-header">
        <h1>Add New Image</h1>
        <p>Upload and manage gallery images</p>
      </div>

      <form onSubmit={handleSubmit} className="add-image-form">
        <div className="form-section">
          <h2>Image Upload</h2>
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${preview ? 'has-image' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={removeImage}
                >
                  <XMarkIcon className="icon" />
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <CloudArrowUpIcon className="upload-icon" />
                <h3>Drop image here or click to browse</h3>
                <p>Supports: JPG, PNG, GIF (Max 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="file-input"
                />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h2>Image Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter image title"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter image description"
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            <CheckIcon className="icon" />
            Add Image
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddImage;