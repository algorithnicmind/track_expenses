import React, { useState } from 'react';
import './Settings.css';
import { FiMoon, FiSun, FiLock, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { usersAPI } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';
import './Settings.css';

const Settings = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      await usersAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      toast.success('Password changed successfully! Please log in again.');
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // In a real app, you'd ask for password confirmation
    toast.error('Account deletion is disabled in demo mode');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Settings</h1>
          <p>Customize your app experience</p>
        </div>
      </div>

      <div className="settings-content">
        {/* Appearance Section */}
        <div className="settings-section">
          <h3 className="section-title">Appearance</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  {theme === 'dark' ? <FiMoon /> : <FiSun />}
                </div>
                <div className="setting-text">
                  <span className="setting-label">Theme</span>
                  <span className="setting-desc">
                    Switch between light and dark mode
                  </span>
                </div>
              </div>
              <button 
                className="theme-switch"
                onClick={toggleTheme}
                data-theme={theme}
              >
                <span className="switch-thumb"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="settings-section">
          <h3 className="section-title">Security</h3>
          <div className="settings-card">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon">
                  <FiLock />
                </div>
                <div className="setting-text">
                  <span className="setting-label">Change Password</span>
                  <span className="setting-desc">
                    Update your account password
                  </span>
                </div>
              </div>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                {showPasswordForm ? 'Cancel' : 'Change'}
              </button>
            </div>
            
            {showPasswordForm && (
              <form className="password-form" onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-input"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-input"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    minLength={8}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section danger-zone">
          <h3 className="section-title">Danger Zone</h3>
          <div className="settings-card danger">
            <div className="setting-item">
              <div className="setting-info">
                <div className="setting-icon danger">
                  <FiTrash2 />
                </div>
                <div className="setting-text">
                  <span className="setting-label">Delete Account</span>
                  <span className="setting-desc">
                    Permanently delete your account and all data
                  </span>
                </div>
              </div>
              <button 
                className="btn btn-danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <ConfirmModal
          title="Delete Account"
          message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
          confirmText="Delete Account"
          confirmType="danger"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

export default Settings;
