import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('username', formData.username); // Store the username
      setError('');
      navigate('/'); // Navigate to the homepage
    } catch (err) {
      setError('Login failed: ' + (err.response.data.detail || 'Unknown error'));
    }
  };

  return (
    <div className="full-container">
      <div className="form-container">
        <h2>Login to CoffeeBerry Classifier</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">LOGIN</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
        <p>Forgot password? <a href="/forgot-password">Click Here</a></p>
      </div>
      <div className="image-container">
        <div className="promo">
          <p>Empowering Farmers with AI-based Coffee Ripeness Detection.</p>
          <img src="/images.jpg" alt="Coffee Berries" />
        </div>
      </div>
    </div>
  );
}

export default Login;
