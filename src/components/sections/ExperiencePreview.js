/**
 * Experience Preview Section Component
 * Brief overview of work experience with timeline
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './ExperiencePreview.css';

const ExperiencePreview = () => {
  const experiences = [
    {
      id: 1,
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications and mentoring junior developers.',
      current: true
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      period: '2020 - 2022',
      description: 'Developed responsive web applications using React and modern JavaScript frameworks.',
      current: false
    },
    {
      id: 3,
      title: 'Junior Web Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      period: '2019 - 2020',
      description: 'Built and maintained client websites using HTML, CSS, and JavaScript.',
      current: false
    }
  ];

  return (
    <motion.section 
      className="experience-preview"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.div 
          className="experience-preview-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="experience-preview-title">Work Experience</h2>
          <p className="experience-preview-description">
            My professional journey in software development and technology.
          </p>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((experience, index) => (
            <motion.div 
              key={experience.id}
              className={`experience-item ${experience.current ? 'current' : ''}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="experience-title">{experience.title}</h3>
                  <div className="experience-company">
                    <FaBriefcase className="experience-icon" />
                    <span>{experience.company}</span>
                  </div>
                </div>
                
                <div className="experience-meta">
                  <div className="experience-period">
                    <FaCalendarAlt className="experience-icon" />
                    <span>{experience.period}</span>
                  </div>
                  <div className="experience-location">
                    <FaMapMarkerAlt className="experience-icon" />
                    <span>{experience.location}</span>
                  </div>
                </div>
                
                <p className="experience-description">{experience.description}</p>
              </div>
              
              <div className="experience-timeline-dot">
                <div className="timeline-dot"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="experience-preview-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/experience" className="btn btn-primary btn-lg">
            View Full Experience
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ExperiencePreview;
