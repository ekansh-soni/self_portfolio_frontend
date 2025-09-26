/**
 * Contact Page Component
 * Contact form and information
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub,
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';
import { contactAPI } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'your.email@example.com',
      href: 'mailto:your.email@example.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/yourusername',
      color: '#0077b5'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      href: 'https://github.com/yourusername',
      color: '#333'
    },
    {
      icon: FaTwitter,
      label: 'Twitter',
      href: 'https://twitter.com/yourusername',
      color: '#1da1f2'
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await contactAPI.sendMessage(data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Contact - Message Sent Successfully</title>
        </Helmet>
        
        <motion.div 
          className="contact-success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <div className="success-content">
              <FaCheckCircle className="success-icon" />
              <h1 className="success-title">Message Sent Successfully!</h1>
              <p className="success-description">
                Thank you for reaching out! I'll get back to you as soon as possible.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact - Get In Touch</title>
        <meta 
          name="description" 
          content="Get in touch with me for project collaborations, job opportunities, or just to say hello. I'd love to hear from you!" 
        />
      </Helmet>

      <motion.div 
        className="contact-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.section 
          className="contact-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <div className="contact-header-content">
              <h1 className="contact-title">Get In Touch</h1>
              <p className="contact-description">
                Ready to start your next project? I'd love to hear from you. 
                Send me a message and I'll respond as soon as possible.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Content */}
        <motion.section 
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container">
            <div className="contact-grid">
              {/* Contact Form */}
              <motion.div 
                className="contact-form-container"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="contact-form-header">
                  <h2 className="form-title">Send a Message</h2>
                  <p className="form-description">
                    Fill out the form below and I'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name', { 
                          required: 'Name is required',
                          minLength: { value: 2, message: 'Name must be at least 2 characters' }
                        })}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <span className="error-message">{errors.name.message}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <span className="error-message">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      {...register('subject', { 
                        required: 'Subject is required',
                        minLength: { value: 5, message: 'Subject must be at least 5 characters' }
                      })}
                      className={`form-input ${errors.subject ? 'error' : ''}`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <span className="error-message">{errors.subject.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      {...register('message', { 
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' }
                      })}
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      placeholder="Tell me about your project or question..."
                      rows={6}
                    />
                    {errors.message && (
                      <span className="error-message">{errors.message.message}</span>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div 
                className="contact-info-container"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="contact-info-header">
                  <h2 className="info-title">Contact Information</h2>
                  <p className="info-description">
                    Prefer to reach out directly? Here are my contact details.
                  </p>
                </div>

                <div className="contact-info-list">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      className="contact-info-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="contact-info-icon">
                        <info.icon />
                      </div>
                      <div className="contact-info-content">
                        <span className="contact-info-label">{info.label}</span>
                        <span className="contact-info-value">{info.value}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="contact-social">
                  <h3 className="social-title">Follow Me</h3>
                  <div className="social-links">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        style={{ color: social.color }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Contact;
