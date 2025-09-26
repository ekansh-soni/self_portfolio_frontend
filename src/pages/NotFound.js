/**
 * 404 Not Found Page
 * Displays when a route is not found
 * 
 * @author Your Name
 * @version 1.0.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaHome, FaArrowLeft, FaSearch } from 'react-icons/fa';
import './NotFound.css';

/**
 * NotFound Component
 * Displays a 404 error page with navigation options
 */
const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Portfolio</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <div className="not-found-page">
        <div className="container">
          <motion.div
            className="not-found-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Illustration */}
            <motion.div
              className="error-illustration"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="error-number">404</div>
              <div className="error-icon">
                <FaSearch />
              </div>
            </motion.div>
            
            {/* Error Message */}
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="error-title">Page Not Found</h1>
              <p className="error-description">
                Sorry, the page you're looking for doesn't exist or has been moved.
                Let's get you back on track!
              </p>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div
              className="error-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/" className="btn btn-primary">
                <FaHome className="btn-icon" />
                Go Home
              </Link>
              
              <button 
                className="btn btn-secondary"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft className="btn-icon" />
                Go Back
              </button>
            </motion.div>
            
            {/* Helpful Links */}
            <motion.div
              className="helpful-links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3>Popular Pages</h3>
              <div className="link-grid">
                <Link to="/about" className="help-link">About Me</Link>
                <Link to="/projects" className="help-link">Projects</Link>
                <Link to="/skills" className="help-link">Skills</Link>
                <Link to="/experience" className="help-link">Experience</Link>
                <Link to="/education" className="help-link">Education</Link>
                <Link to="/contact" className="help-link">Contact</Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

