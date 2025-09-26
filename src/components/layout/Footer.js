/**
 * Footer Component
 * Site footer with links, social media, and copyright information
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope,
  FaHeart,
  FaArrowUp
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  // Footer links
  const footerLinks = {
    portfolio: [
      { path: '/about', label: 'About' },
      { path: '/projects', label: 'Projects' },
      { path: '/skills', label: 'Skills' },
      { path: '/experience', label: 'Experience' }
    ],
    resources: [
      { path: '/education', label: 'Education' },
      { path: '/contact', label: 'Contact' },
      { path: '/login', label: 'Login' },
      { path: '/dashboard', label: 'Dashboard' }
    ]
  };

  // Social media links
  const socialLinks = [
    { 
      icon: FaGithub, 
      href: 'https://github.com/yourusername', 
      label: 'GitHub',
      color: '#333'
    },
    { 
      icon: FaLinkedin, 
      href: 'https://linkedin.com/in/yourusername', 
      label: 'LinkedIn',
      color: '#0077b5'
    },
    { 
      icon: FaTwitter, 
      href: 'https://twitter.com/yourusername', 
      label: 'Twitter',
      color: '#1da1f2'
    },
    { 
      icon: FaInstagram, 
      href: 'https://instagram.com/yourusername', 
      label: 'Instagram',
      color: '#e4405f'
    },
    { 
      icon: FaEnvelope, 
      href: 'mailto:your.email@example.com', 
      label: 'Email',
      color: '#ea4335'
    }
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-title">Portfolio</h3>
            <p className="footer-description">
              A modern, responsive portfolio showcasing my skills, 
              projects, and professional experience.
            </p>
            
            {/* Social Links */}
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={social.label}
                >
                  <social.icon style={{ color: social.color }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          <div className="footer-links">
            {/* Portfolio Links */}
            <motion.div 
              className="footer-links-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="footer-links-title">Portfolio</h4>
              <ul className="footer-links-list">
                {footerLinks.portfolio.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div 
              className="footer-links-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="footer-links-title">Resources</h4>
              <ul className="footer-links-list">
                {footerLinks.resources.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Portfolio. Made with{' '}
              <FaHeart className="footer-heart" /> by Your Name.
            </p>
            
            <button 
              className="footer-scroll-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <FaArrowUp />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

