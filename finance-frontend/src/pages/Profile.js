import React, { useState } from 'react';
import './Profile.css';
import { FiUser, FiMail, FiCalendar, FiEdit2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await usersAPI.updateProfile(formData);
      updateUser(response.data.data);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Profile</h1>
          <p>Manage your account information</p>
        </div>
      </div>

      <div className="profile-content">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="profile-info">
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
            </div>
            {!editing && (
              <button 
                className="btn btn-secondary edit-btn"
                onClick={() => setEditing(true)}
              >
                <FiEdit2 /> Edit
              </button>
            )}
          </div>

          {editing ? (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditing(false);
                    setFormData({ name: user?.name || '' });
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-item">
                <div className="detail-icon">
                  <FiUser />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{user?.name}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-icon">
                  <FiMail />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{user?.email}</span>
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-icon">
                  <FiCalendar />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">{formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="stats-card">
          <h3>Account Statistics</h3>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Currency</span>
              <span className="stat-value">{user?.currency || 'INR'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Theme</span>
              <span className="stat-value">{user?.theme || 'Light'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
