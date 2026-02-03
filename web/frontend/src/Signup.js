import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    location: '',
    farm_size: '',
    coffee_type: '',
    last_farming_time: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/register/', formData);
      console.log(response.data);
      setError('');
      // Redirect or show success message
    } catch (err) {
      setError('Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="full-container">
      <div className="form-container">
        <h2>Create an account to Access CoffeeBerry Classifier</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="number" name="farm_size" placeholder="Farm Size (in hectares)" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" name="coffee_type" placeholder="Coffee Type" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="date" name="last_farming_time" placeholder="Last Farming Time" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} required />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">SIGN UP</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
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

export default Signup;
