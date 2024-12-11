import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import "./login1.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.token); // Save token for authentication
      alert('Login successful');
      navigate('/'); // Redirect to dashboard
    } catch (err) {
      console.error(err.response?.data?.error || 'Invalid credentials');
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="animated-title">Admin Portal Login</h2>
      <form className='form1' onSubmit={handleSubmit}>
        <input className='login-input'
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
        className='login-input'
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          required
        />
        <button className='login-btn' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
