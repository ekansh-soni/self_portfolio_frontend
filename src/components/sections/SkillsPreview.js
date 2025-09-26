/**
 * Skills Preview Section Component
 * Showcase of technical skills with progress indicators
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCode, FaPalette, FaDatabase, FaMobile } from 'react-icons/fa';
import './SkillsPreview.css';

const SkillsPreview = () => {
  const skillCategories = [
    {
      icon: FaCode,
      title: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java'],
      color: '#3b82f6'
    },
    {
      icon: FaPalette,
      title: 'Frontend Development',
      skills: ['React', 'Vue.js', 'HTML/CSS', 'Tailwind CSS'],
      color: '#8b5cf6'
    },
    {
      icon: FaDatabase,
      title: 'Backend Development',
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
      color: '#10b981'
    },
    {
      icon: FaMobile,
      title: 'Mobile Development',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      color: '#f59e0b'
    }
  ];

  const topSkills = [
    { name: 'React', level: 95, color: '#61dafb' },
    { name: 'JavaScript', level: 90, color: '#f7df1e' },
    { name: 'Node.js', level: 85, color: '#68a063' },
    { name: 'TypeScript', level: 80, color: '#3178c6' },
    { name: 'MongoDB', level: 75, color: '#47a248' }
  ];

  return (
    <motion.section 
      className="skills-preview"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.div 
          className="skills-preview-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="skills-preview-title">Technical Skills</h2>
          <p className="skills-preview-description">
            A comprehensive overview of my technical expertise and proficiency levels.
          </p>
        </motion.div>

        <div className="skills-preview-content">
          {/* Skill Categories */}
          <motion.div 
            className="skill-categories"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {skillCategories.map((category, index) => (
              <motion.div 
                key={category.title}
                className="skill-category"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className="skill-category-icon"
                  style={{ backgroundColor: category.color }}
                >
                  <category.icon />
                </div>
                <h3 className="skill-category-title">{category.title}</h3>
                <div className="skill-category-skills">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Top Skills Progress */}
          <motion.div 
            className="top-skills"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="top-skills-title">Top Skills</h3>
            <div className="skills-progress">
              {topSkills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="skill-progress-item"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="skill-progress-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <motion.div 
                      className="skill-progress-fill"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="skills-preview-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/skills" className="btn btn-primary btn-lg">
            View All Skills
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SkillsPreview;
