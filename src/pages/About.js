/**
 * About Page Component
 * Detailed information about the developer
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaLightbulb, 
  FaHeart, 
  FaGraduationCap,
  FaDownload,
  FaArrowRight
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const values = [
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'I believe in writing maintainable, readable, and efficient code that stands the test of time.'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'Always exploring new technologies and approaches to solve problems in creative ways.'
    },
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'Genuine love for what I do drives me to continuously improve and deliver exceptional results.'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Senior Developer',
      description: 'Leading development teams and architecting scalable solutions.'
    },
    {
      year: '2021',
      title: 'Full-Stack Developer',
      description: 'Expanded skills to include backend development and database design.'
    },
    {
      year: '2019',
      title: 'Frontend Developer',
      description: 'Started my journey in web development with React and modern JavaScript.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Me - Professional Developer & Designer</title>
        <meta 
          name="description" 
          content="Learn more about my journey as a developer, my values, and what drives me to create exceptional digital experiences." 
        />
      </Helmet>

      <motion.div 
        className="about-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <motion.section 
          className="about-hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <div className="about-hero-content">
              <motion.div 
                className="about-hero-text"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="about-hero-title">
                  About <span className="highlight">Me</span>
                </h1>
                <p className="about-hero-description">
                  I'm a passionate full-stack developer with over 3 years of experience 
                  creating digital solutions that make a difference. My journey in 
                  technology started with curiosity and has evolved into a deep love 
                  for building meaningful applications.
                </p>
                <div className="about-hero-actions">
                  <a href="/resume.pdf" download className="btn btn-primary">
                    <FaDownload />
                    Download Resume
                  </a>
                  <a href="/contact" className="btn btn-outline">
                    Get In Touch
                    <FaArrowRight />
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="about-hero-image"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="profile-image">
                  <div className="profile-placeholder">
                    <span>Your Photo</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          className="about-values"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <motion.div 
              className="values-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="values-title">My Values</h2>
              <p className="values-description">
                The principles that guide my work and shape my approach to development.
              </p>
            </motion.div>
            
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div 
                  key={value.title}
                  className="value-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="value-icon">
                    <value.icon />
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section 
          className="about-timeline"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <motion.div 
              className="timeline-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="timeline-title">My Journey</h2>
              <p className="timeline-description">
                A timeline of my professional growth and key milestones.
              </p>
            </motion.div>
            
            <div className="timeline-container">
              {timeline.map((item, index) => (
                <motion.div 
                  key={item.year}
                  className="timeline-item"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <h3 className="timeline-item-title">{item.title}</h3>
                    <p className="timeline-item-description">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="about-cta"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Let's Work Together</h2>
              <p className="cta-description">
                I'm always excited to work on new projects and collaborate with 
                amazing people. Let's create something extraordinary together!
              </p>
              <div className="cta-actions">
                <a href="/contact" className="btn btn-primary btn-lg">
                  Start a Project
                  <FaArrowRight />
                </a>
                <a href="/projects" className="btn btn-outline btn-lg">
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default About;
