/**
 * Hero Section Component
 * Main landing section with animated text and call-to-action
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowDown, FaDownload, FaPlay, FaCode } from 'react-icons/fa';
import { ReactTyped } from 'react-typed';
import './Hero.css';

const Hero = () => {

  // Typed text options
  const typedStrings = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'React Specialist',
    'Problem Solver',
    'Creative Thinker'
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Handle typing completion
  const handleTypingComplete = () => {
    // Typing completed
  };

  // Scroll to next section
  const scrollToNext = () => {
    const nextSection = document.querySelector('.about-preview');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      className="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-container">
        <div className="hero-content">
          {/* Main Content */}
          <motion.div 
            className="hero-text"
            variants={itemVariants}
          >
            <motion.h1 
              className="hero-title"
              variants={itemVariants}
            >
              Hi, I'm{' '}
              <span className="hero-name">Ekansh Soni</span>
            </motion.h1>
            
            <motion.div 
              className="hero-subtitle"
              variants={itemVariants}
            >
              <span className="hero-label">I'm a </span>
              <ReactTyped
                strings={typedStrings}
                typeSpeed={50}
                backSpeed={30}
                backDelay={2000}
                loop
                onComplete={handleTypingComplete}
                className="hero-typed"
              />
            </motion.div>
            
            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              Passionate about creating exceptional digital experiences through 
              innovative web development, modern design principles, and cutting-edge 
              technologies. Let's build something amazing together!
            </motion.p>
            
            <motion.div 
              className="hero-actions"
              variants={itemVariants}
            >
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get In Touch
                <FaArrowDown />
              </Link>
              
              <Link to="/projects" className="btn btn-outline btn-lg">
                View My Work
              </Link>
              
              <a 
                href="/resume.pdf" 
                download 
                className="btn btn-ghost btn-lg"
              >
                <FaDownload />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div 
            className="hero-visual"
            variants={itemVariants}
          >
            <div className="hero-image-container">
              <div className="hero-image">
                {/* Placeholder for profile image */}
                <div className="profile-image">
                  <div className="profile-placeholder">
                    <span>Your Photo</span>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="floating-elements">
                  <motion.div 
                    className="floating-element element-1"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <FaCode />
                  </motion.div>
                  
                  <motion.div 
                    className="floating-element element-2"
                    animate={{ 
                      y: [0, 15, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1
                    }}
                  >
                    <FaPlay />
                  </motion.div>
                  
                  <motion.div 
                    className="floating-element element-3"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 3, 0]
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5
                    }}
                  >
                    <FaDownload />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="hero-scroll"
          variants={itemVariants}
          onClick={scrollToNext}
        >
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <FaArrowDown />
            <span>Scroll Down</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="hero-background">
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>
      </div>
    </motion.section>
  );
};

export default Hero;

