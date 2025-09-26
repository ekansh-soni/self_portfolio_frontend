/**
 * Contact Preview Section Component
 * Contact information and call-to-action
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowRight, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub,
  FaTwitter
} from 'react-icons/fa';
import './ContactPreview.css';

const ContactPreview = () => {
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

  return (
    <motion.section 
      className="contact-preview"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.div 
          className="contact-preview-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="contact-preview-title">Let's Work Together</h2>
          <p className="contact-preview-description">
            Ready to bring your ideas to life? I'd love to hear about your project 
            and discuss how we can work together to create something amazing.
          </p>
        </motion.div>

        <div className="contact-preview-content">
          {/* Contact Information */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="contact-info-title">Get In Touch</h3>
            
            <div className="contact-info-list">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="contact-info-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
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

            {/* Social Links */}
            <div className="contact-social">
              <h4 className="contact-social-title">Follow Me</h4>
              <div className="contact-social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    style={{ color: social.color }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="contact-cta"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="contact-cta-content">
              <h3 className="contact-cta-title">Ready to Start?</h3>
              <p className="contact-cta-description">
                Whether you have a specific project in mind or just want to chat 
                about possibilities, I'm here to help. Let's create something 
                extraordinary together!
              </p>
              
              <div className="contact-cta-actions">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Send Message
                  <FaArrowRight />
                </Link>
                
                <a 
                  href="/resume.pdf" 
                  download 
                  className="btn btn-outline btn-lg"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactPreview;
