import React, { useState } from 'react';
import { SpeakerWaveIcon, FireIcon, CheckCircleIcon, CalendarDaysIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon, PlusIcon, EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import PageHeader from '../../components/page-header';
import './style.css';

const Notice: React.FC = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Annual Examination Schedule',
      content: 'The annual examination will commence from 15th March 2024.',
      category: 'Examination',
      priority: 'High',
      date: '2024-02-15',
      author: 'Admin',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Holiday Notice',
      content: 'College will remain closed on 26th January 2024 for Republic Day.',
      category: 'Holiday',
      priority: 'Medium',
      date: '2024-01-20',
      author: 'Admin',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Fee Submission Deadline',
      content: 'Last date for fee submission is 31st January 2024.',
      category: 'Fee',
      priority: 'High',
      date: '2024-01-10',
      author: 'Accounts',
      status: 'Active'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    priority: 'Medium',
    targetAudience: 'All Students'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice = {
      id: notices.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
      author: 'Admin',
      status: 'Active'
    };
    setNotices([...notices, newNotice]);
    setFormData({ title: '', content: '', category: '', priority: 'Medium', targetAudience: 'All Students' });
    alert('Notice added successfully!');
  };

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || notice.category === filterCategory;
    const matchesPriority = filterPriority === 'All' || notice.priority === filterPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#ff4757';
      case 'Medium': return '#ffa502';
      case 'Low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const ViewNotice = () => (
    <div className="view-notice">
      <div className="notice-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <SpeakerWaveIcon className="icon" />
          </div>
          <div className="stat-info">
            <h3>{notices.length}</h3>
            <p>Total Notices</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FireIcon className="icon" />
          </div>
          <div className="stat-info">
            <h3>{notices.filter(n => n.priority === 'High').length}</h3>
            <p>High Priority</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircleIcon className="icon" />
          </div>
          <div className="stat-info">
            <h3>{notices.filter(n => n.status === 'Active').length}</h3>
            <p>Active Notices</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <CalendarDaysIcon className="icon" />
          </div>
          <div className="stat-info">
            <h3>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</h3>
            <p>Today's Date</p>
          </div>
        </div>
      </div>

      <div className="notice-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Examination">Examination</option>
          <option value="Holiday">Holiday</option>
          <option value="Fee">Fee</option>
          <option value="Event">Event</option>
          <option value="Academic">Academic</option>
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="notice-list">
        {filteredNotices.map(notice => (
          <div key={notice.id} className="notice-card">
            <div className="notice-header">
              <h3>{notice.title}</h3>
              <div className="notice-meta">
                <span className="priority" style={{ backgroundColor: getPriorityColor(notice.priority) }}>
                  {notice.priority}
                </span>
                <span className="category">{notice.category}</span>
              </div>
            </div>
            <p className="notice-content">{notice.content}</p>
            <div className="notice-footer">
              <div className="notice-info">
                <span><CalendarDaysIcon className="info-icon" /> {notice.date}</span>
                <span>👤 {notice.author}</span>
              </div>
              <div className="notice-actions">
                <button className="edit-btn"><PencilIcon className="btn-icon" /> Edit</button>
                <button className="delete-btn"><TrashIcon className="btn-icon" /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AddNotice = () => (
    <div className="add-notice">
      <form onSubmit={handleSubmit} className="notice-form">
        <div className="form-section">
          <div className="section-header">
            <h3><DocumentTextIcon className="section-icon" /> Notice Details</h3>
          </div>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Notice Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter notice title"
                required
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                <option value="Examination">Examination</option>
                <option value="Holiday">Holiday</option>
                <option value="Fee">Fee</option>
                <option value="Event">Event</option>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Library">Library</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleInputChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Target Audience</label>
              <select name="targetAudience" value={formData.targetAudience} onChange={handleInputChange}>
                <option value="All Students">All Students</option>
                <option value="Faculty">Faculty</option>
                <option value="Staff">Staff</option>
                <option value="Parents">Parents</option>
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Notice Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter notice content..."
                rows={6}
                required
              />
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn"><SpeakerWaveIcon className="btn-icon" /> Publish Notice</button>
          <button type="button" className="cancel-btn" onClick={() => setFormData({ title: '', content: '', category: '', priority: 'Medium', targetAudience: 'All Students' })}>🔄 Reset</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="notice-page">
      <PageHeader
        title="Notice Management"
        subtitle="Manage and publish notices for students, faculty, and staff"
      />

      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          <EyeIcon className="tab-icon" /> View Notices
        </button>
        <button
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          <PlusIcon className="tab-icon" /> Add Notice
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'view' ? <ViewNotice /> : <AddNotice />}
      </div>
    </div>
  );
};

export default Notice;