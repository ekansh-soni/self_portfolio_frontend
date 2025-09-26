/**
 * Home Page Component
 * Landing page with hero section, featured content, and call-to-action
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaArrowRight, 
  FaCode, 
  FaRocket, 
  FaUsers, 
  FaLightbulb,
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from 'react-icons/fa';
import Hero from '../components/sections/Hero';
import AboutPreview from '../components/sections/AboutPreview';
import ProjectsPreview from '../components/sections/ProjectsPreview';
import SkillsPreview from '../components/sections/SkillsPreview';
import ExperiencePreview from '../components/sections/ExperiencePreview';
import ContactPreview from '../components/sections/ContactPreview';
import './Home.css';

const Home = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Portfolio - Professional Developer & Designer</title>
        <meta 
          name="description" 
          content="Professional portfolio showcasing modern web development, design skills, and innovative projects. Explore my work and get in touch!" 
        />
        <meta name="keywords" content="portfolio, web developer, designer, react, javascript, projects" />
        <meta property="og:title" content="Portfolio - Professional Developer & Designer" />
        <meta property="og:description" content="Professional portfolio showcasing modern web development, design skills, and innovative projects." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio - Professional Developer & Designer" />
        <meta name="twitter:description" content="Professional portfolio showcasing modern web development, design skills, and innovative projects." />
      </Helmet>

      <motion.div 
        className="home-page"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <Hero />

        {/* About Preview Section */}
        <AboutPreview />

        {/* Skills Preview Section */}
        <SkillsPreview />

        {/* Projects Preview Section */}
        <ProjectsPreview />

        {/* Experience Preview Section */}
        <ExperiencePreview />

        {/* Contact Preview Section */}
        <ContactPreview />

        {/* Call to Action Section */}
        <motion.section 
          className="cta-section"
          variants={itemVariants}
        >
          <div className="container">
            <div className="cta-content">
              <motion.h2 
                className="cta-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to Work Together?
              </motion.h2>
              
              <motion.p 
                className="cta-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Let's discuss your next project and bring your ideas to life with 
                modern technology and creative solutions.
              </motion.p>
              
              <motion.div 
                className="cta-actions"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Get In Touch
                  <FaArrowRight />
                </Link>
                
                <Link to="/projects" className="btn btn-outline btn-lg">
                  View My Work
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Quick Stats Section */}
        <motion.section 
          className="stats-section"
          variants={itemVariants}
        >
          <div className="container">
            <div className="stats-grid">
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">
                  <FaCode />
                </div>
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Completed</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">
                  <FaRocket />
                </div>
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Experience</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">
                  <FaUsers />
                </div>
                <div className="stat-number">25+</div>
                <div className="stat-label">Happy Clients</div>
              </motion.div>
              
              <motion.div 
                className="stat-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">
                  <FaLightbulb />
                </div>
                <div className="stat-number">100+</div>
                <div className="stat-label">Ideas Implemented</div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Social Links Section */}
        <motion.section 
          className="social-section"
          variants={itemVariants}
        >
          <div className="container">
            <div className="social-content">
              <motion.h3 
                className="social-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Connect With Me
              </motion.h3>
              
              <motion.div 
                className="social-links"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub />
                  <span>GitHub</span>
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </motion.a>
                
                <motion.a
                  href="mailto:your.email@example.com"
                  className="social-link"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope />
                  <span>Email</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Home;
