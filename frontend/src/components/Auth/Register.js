import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../utils/apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token !== 'null') {
      navigate('/');
    }
  }, [navigate]);

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, formData);
      toast.success("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <h2>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={onChange}
            required
          />
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
          <button type='submit'>Register</button>
        </form>
        <Link to='/login' className='auth-link'>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
