import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './apiLayer/authApi.js';
import styles from './css/Auth.css';

function DelivererRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNr: '',
  });
  const [error, setError] = useState('');

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const success = await registerUser(formData, true); // true for isDel parameter
      
      if (success) {
        navigate('/deliverer/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error('Registration error:', err);
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
        <h2>Deliverer Registration</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phoneNr"
              value={formData.phoneNr}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>
         
          <button type="submit" className="auth-submit-btn">Register</button>
        </form>
        <p className="auth-redirect">
          Already have an account?{' '}
          <span onClick={() => navigate('/deliverer/login')} className="auth-link">
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default DelivererRegister;