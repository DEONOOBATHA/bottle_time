import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginCheck } from './apiLayer/authApi.js';

const UserLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const success = await loginCheck(formData);
      if (success) {
        await onLoginSuccess();
        navigate('/homepage', { replace: true });
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error('Login error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-background image"></div>
      <div className="auth-overlay"></div>
      <div className="auth-content">
        <h2 className="text-2xl font-semibold mb-6">Customer Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="text-gray-900"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="text-gray-900"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Login
          </button>
        </form>

        <div className="auth-redirect">
          Don't have an account?{' '}
          <Link to="/user/register" className="auth-link">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;