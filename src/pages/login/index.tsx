import React, { useState } from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import './style.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check credentials
    if (formData.email === 'admin@gmail.com' && formData.password === 'Admin@123') {
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 2000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        alert('Invalid credentials! Please use admin@gmail.com and Admin@123');
      }, 2000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="card-content">
            <div className="college-branding">
              <img src="/logo-college.png" alt="College Logo" className="college-logo" />
              <div className="college-info">
                <h1>Siddhivinayak College of Technology & Research</h1>
                <p>Excellence in Education</p>
                <p className="tagline">Shaping Future Leaders</p>
              </div>
            </div>
            <div className="login-section">
              <div className="login-header">
                <h2>Admin Login</h2>
                <p>Welcome back! Please sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <UserIcon className="input-icon" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <LockClosedIcon className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashIcon className="icon" /> : <EyeIcon className="icon" />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-wrapper">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  'Sign In'
                )}
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;