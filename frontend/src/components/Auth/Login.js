import React, { useState, useEffect } from 'react';
import styles from './Auth.module.css';
import axios from 'axios';
import API_URL from '../../utils/apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token !== 'null') {
      navigate('/');
    }
  }, [navigate]);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success("Login Successful!");
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-form']}>
        <h2>Login</h2>
        <form onSubmit={onSubmit}>
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
            disabled={isLoading}
          />
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <Link to='/register' className={styles['auth-link']}>
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
