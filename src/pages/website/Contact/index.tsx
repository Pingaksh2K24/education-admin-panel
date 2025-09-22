import React, { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import './style.css';

interface ContactInfo {
  id: number;
  type: 'phone' | 'email' | 'address' | 'hours';
  label: string;
  value: string;
  isActive: boolean;
}

const Contact: React.FC = () => {
  const [contactData, setContactData] = useState<ContactInfo[]>([
    { id: 1, type: 'phone', label: 'Main Office', value: '+91 98765 43210', isActive: true },
    { id: 2, type: 'phone', label: 'Admission Office', value: '+91 98765 43211', isActive: true },
    { id: 3, type: 'email', label: 'General Inquiry', value: 'info@siddhivinayakcollege.edu', isActive: true },
    { id: 4, type: 'email', label: 'Admissions', value: 'admissions@siddhivinayakcollege.edu', isActive: true },
    { id: 5, type: 'address', label: 'Campus Address', value: 'Siddhivinayak College, Education City, Mumbai - 400001', isActive: true },
    { id: 6, type: 'hours', label: 'Office Hours', value: 'Mon-Fri: 9:00 AM - 5:00 PM', isActive: true }
  ]);

  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ type: 'phone', label: '', value: '' });

  const getIcon = (type: string) => {
    switch (type) {
      case 'phone': return PhoneIcon;
      case 'email': return EnvelopeIcon;
      case 'address': return MapPinIcon;
      case 'hours': return ClockIcon;
      default: return PhoneIcon;
    }
  };

  const handleEdit = (id: number, value: string) => {
    setIsEditing(id);
    setEditValue(value);
  };

  const handleSave = (id: number) => {
    setContactData(prev => prev.map(item => 
      item.id === id ? { ...item, value: editValue } : item
    ));
    setIsEditing(null);
    setEditValue('');
  };

  const handleDelete = (id: number) => {
    setContactData(prev => prev.filter(item => item.id !== id));
  };

  const handleAdd = () => {
    const newId = Math.max(...contactData.map(item => item.id)) + 1;
    setContactData(prev => [...prev, {
      id: newId,
      type: newContact.type as 'phone' | 'email' | 'address' | 'hours',
      label: newContact.label,
      value: newContact.value,
      isActive: true
    }]);
    setNewContact({ type: 'phone', label: '', value: '' });
    setShowAddForm(false);
  };

  const toggleStatus = (id: number) => {
    setContactData(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Information Management</h1>
        <button 
          className="add-btn"
          onClick={() => setShowAddForm(true)}
        >
          <PlusIcon className="icon" />
          Add Contact Info
        </button>
      </div>

      {showAddForm && (
        <div className="add-form-overlay">
          <div className="add-form">
            <h3>Add New Contact Information</h3>
            <div className="form-group">
              <label>Type</label>
              <select 
                value={newContact.type}
                onChange={(e) => setNewContact(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="address">Address</option>
                <option value="hours">Hours</option>
              </select>
            </div>
            <div className="form-group">
              <label>Label</label>
              <input 
                type="text"
                value={newContact.label}
                onChange={(e) => setNewContact(prev => ({ ...prev, label: e.target.value }))}
                placeholder="e.g., Main Office"
              />
            </div>
            <div className="form-group">
              <label>Value</label>
              <input 
                type="text"
                value={newContact.value}
                onChange={(e) => setNewContact(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Enter contact information"
              />
            </div>
            <div className="form-actions">
              <button onClick={handleAdd} className="save-btn">Add</button>
              <button onClick={() => setShowAddForm(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="contact-grid">
        {contactData.map((item) => {
          const IconComponent = getIcon(item.type);
          return (
            <div key={item.id} className={`contact-card ${!item.isActive ? 'inactive' : ''}`}>
              <div className="card-header">
                <div className="icon-wrapper">
                  <IconComponent className="contact-icon" />
                </div>
                <div className="card-actions">
                  <button 
                    className={`status-toggle ${item.isActive ? 'active' : 'inactive'}`}
                    onClick={() => toggleStatus(item.id)}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(item.id, item.value)}
                  >
                    <PencilIcon className="icon" />
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    <TrashIcon className="icon" />
                  </button>
                </div>
              </div>
              
              <div className="card-content">
                <h3>{item.label}</h3>
                {isEditing === item.id ? (
                  <div className="edit-form">
                    <input 
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-input"
                    />
                    <div className="edit-actions">
                      <button onClick={() => handleSave(item.id)} className="save-btn">Save</button>
                      <button onClick={() => setIsEditing(null)} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p className="contact-value">{item.value}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;