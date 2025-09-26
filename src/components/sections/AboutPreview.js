/**
 * About Preview Section Component
 * Brief introduction with link to full about page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaUser, FaCode, FaLightbulb } from 'react-icons/fa';
import './AboutPreview.css';

const AboutPreview = () => {
  const features = [
    {
      icon: FaCode,
      title: 'Full-Stack Development',
      description: 'Building end-to-end web applications with modern technologies'
    },
    {
      icon: FaUser,
      title: 'User-Centered Design',
      description: 'Creating intuitive and accessible user experiences'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation Focus',
      description: 'Always exploring new technologies and best practices'
    }
  ];

  return (
    <motion.section 
      className="about-preview"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="about-preview-content">
          <motion.div 
            className="about-preview-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="about-preview-title">
              About Me
            </h2>
            
            <p className="about-preview-description">
              I'm a passionate full-stack developer with over 3 years of experience 
              creating digital solutions that make a difference. I specialize in 
              modern web technologies and love turning complex problems into 
              simple, beautiful, and intuitive designs.
            </p>
            
            <p className="about-preview-description">
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with 
              the developer community.
            </p>
            
            <Link to="/about" className="btn btn-primary">
              Learn More About Me
              <FaArrowRight />
            </Link>
          </motion.div>
          
          <motion.div 
            className="about-preview-features"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-icon">
                  <feature.icon />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutPreview;
