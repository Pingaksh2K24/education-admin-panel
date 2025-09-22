import React, { useState } from 'react';
import { 
  PhotoIcon, 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FolderIcon
} from '@heroicons/react/24/outline';
import './style.css';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  uploadDate: string;
  isActive: boolean;
}

interface GalleryProps {
  onNavigate?: (page: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: 1,
      title: 'Annual Day Celebration 2024',
      category: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop',
      description: 'Students performing cultural activities during annual day',
      uploadDate: '2024-01-15',
      isActive: true
    },
    {
      id: 2,
      title: 'Campus Infrastructure',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
      description: 'Modern college building and facilities',
      uploadDate: '2024-01-10',
      isActive: true
    },
    {
      id: 3,
      title: 'Sports Day 2024',
      category: 'Sports',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      description: 'Students participating in various sports activities',
      uploadDate: '2024-01-08',
      isActive: false
    },
    {
      id: 4,
      title: 'Science Exhibition',
      category: 'Academic',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
      description: 'Students showcasing their science projects',
      uploadDate: '2024-01-05',
      isActive: true
    },
    {
      id: 5,
      title: 'Cultural Fest 2024',
      category: 'Cultural',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      description: 'Students showcasing their cultural talents',
      uploadDate: '2024-01-12',
      isActive: true
    },
    {
      id: 6,
      title: 'Library Study Area',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      description: 'Modern library with study facilities',
      uploadDate: '2024-01-08',
      isActive: true
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  interface GalleryProps {
    onNavigate?: (page: string) => void;
  }

  const handleAddImage = () => {
    if (onNavigate) {
      onNavigate('Add Image');
    }
  };
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Events', 'Campus', 'Sports', 'Academic', 'Cultural'];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const toggleStatus = (id: number) => {
    setGalleryItems(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const deleteItem = (id: number) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Gallery Management</h1>
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <PhotoIcon className="icon" />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FolderIcon className="icon" />
            </button>
          </div>
          <button 
            className="add-btn"
            onClick={handleAddImage}
          >
            <PlusIcon className="icon" />
            Add Image
          </button>
        </div>
      </div>

      <div className="gallery-filters">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="stats">
          <span className="stat-item">
            Total: {galleryItems.length}
          </span>
          <span className="stat-item">
            Active: {galleryItems.filter(item => item.isActive).length}
          </span>
        </div>
      </div>

      <div className={`gallery-content ${viewMode}`}>
        {filteredItems.map(item => (
          <div key={item.id} className={`gallery-item ${!item.isActive ? 'inactive' : ''}`}>
            <div className="image-container">
              <img src={item.imageUrl} alt={item.title} />
              <div className="image-overlay">
                <button className="overlay-btn view-btn">
                  <EyeIcon className="icon" />
                </button>
                <button className="overlay-btn edit-btn">
                  <PencilIcon className="icon" />
                </button>
                <button 
                  className="overlay-btn delete-btn"
                  onClick={() => deleteItem(item.id)}
                >
                  <TrashIcon className="icon" />
                </button>
              </div>
            </div>
            <div className="item-info">
              <div className="item-header">
                <h3>{item.title}</h3>
                <button 
                  className={`status-toggle ${item.isActive ? 'active' : 'inactive'}`}
                  onClick={() => toggleStatus(item.id)}
                >
                  {item.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
              <div className="item-meta">
                <span className="category">{item.category}</span>
                <span className="date">{new Date(item.uploadDate).toLocaleDateString()}</span>
              </div>
              <p className="description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state">
          <PhotoIcon className="empty-icon" />
          <h3>No images found</h3>
          <p>No images match the selected category</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;