/**
 * Login Page Component
 * User authentication form
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaLock, FaUser, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const result = await login(data);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Portfolio Dashboard</title>
        <meta 
          name="description" 
          content="Login to your portfolio dashboard to manage your profile, projects, and content." 
        />
      </Helmet>

      <motion.div 
        className="login-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-container">
          <motion.div 
            className="login-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="login-header">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-description">
                Sign in to your account to access your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <div className="form-group">
                <label htmlFor="identifier" className="form-label">
                  Email or Username
                </label>
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="identifier"
                    {...register('identifier', { 
                      required: 'Email or username is required'
                    })}
                    className={`form-input ${errors.identifier ? 'error' : ''}`}
                    placeholder="Enter your email or username"
                  />
                </div>
                {errors.identifier && (
                  <span className="error-message">{errors.identifier.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-container">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', { 
                      required: 'Password is required'
                    })}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password.message}</span>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p className="signup-text">
                Don't have an account?{' '}
                <Link to="/register" className="signup-link">
                  Sign up here
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Login;
