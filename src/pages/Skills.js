/**
 * Skills Page Component
 * Showcase of technical skills and expertise
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaPalette, 
  FaDatabase, 
  FaMobile, 
  FaCloud,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'All',
    'Programming Languages',
    'Frameworks & Libraries',
    'Databases',
    'Tools & Technologies',
    'Design',
    'Cloud & DevOps',
    'Mobile Development',
    'Data Science'
  ];

  // Mock data - replace with actual API call
  const mockSkills = [
    {
      id: 1,
      name: 'JavaScript',
      category: 'Programming Languages',
      proficiency: 95,
      yearsOfExperience: 4,
      description: 'Advanced JavaScript with ES6+, async programming, and modern frameworks',
      color: '#f7df1e'
    },
    {
      id: 2,
      name: 'React',
      category: 'Frameworks & Libraries',
      proficiency: 90,
      yearsOfExperience: 3,
      description: 'React development with hooks, context, and state management',
      color: '#61dafb'
    },
    {
      id: 3,
      name: 'Node.js',
      category: 'Frameworks & Libraries',
      proficiency: 85,
      yearsOfExperience: 3,
      description: 'Server-side JavaScript with Express, REST APIs, and microservices',
      color: '#68a063'
    },
    {
      id: 4,
      name: 'TypeScript',
      category: 'Programming Languages',
      proficiency: 80,
      yearsOfExperience: 2,
      description: 'Type-safe JavaScript development with advanced type features',
      color: '#3178c6'
    },
    {
      id: 5,
      name: 'MongoDB',
      category: 'Databases',
      proficiency: 75,
      yearsOfExperience: 2,
      description: 'NoSQL database design, aggregation, and optimization',
      color: '#47a248'
    },
    {
      id: 6,
      name: 'Python',
      category: 'Programming Languages',
      proficiency: 70,
      yearsOfExperience: 2,
      description: 'Python development for web applications and data analysis',
      color: '#3776ab'
    },
    {
      id: 7,
      name: 'AWS',
      category: 'Cloud & DevOps',
      proficiency: 65,
      yearsOfExperience: 1,
      description: 'Cloud infrastructure, deployment, and serverless architecture',
      color: '#ff9900'
    },
    {
      id: 8,
      name: 'Docker',
      category: 'Tools & Technologies',
      proficiency: 70,
      yearsOfExperience: 1,
      description: 'Containerization and orchestration with Docker',
      color: '#2496ed'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSkills(mockSkills);
      setFilteredSkills(mockSkills);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = skills;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(skill => skill.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSkills(filtered);
  }, [skills, searchTerm, selectedCategory]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Programming Languages':
        return FaCode;
      case 'Frameworks & Libraries':
        return FaCode;
      case 'Databases':
        return FaDatabase;
      case 'Design':
        return FaPalette;
      case 'Cloud & DevOps':
        return FaCloud;
      case 'Mobile Development':
        return FaMobile;
      default:
        return FaCode;
    }
  };

  const getProficiencyLevel = (proficiency) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 75) return 'Advanced';
    if (proficiency >= 60) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <>
      <Helmet>
        <title>Skills - Technical Expertise</title>
        <meta 
          name="description" 
          content="Explore my technical skills and expertise in programming languages, frameworks, tools, and technologies." 
        />
      </Helmet>

      <motion.div 
        className="skills-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.section 
          className="skills-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <div className="skills-header-content">
              <h1 className="skills-title">Technical Skills</h1>
              <p className="skills-description">
                A comprehensive overview of my technical expertise and proficiency levels 
                across various technologies and tools.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Filters Section */}
        <motion.section 
          className="skills-filters"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="container">
            <div className="filters-content">
              {/* Search Bar */}
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Category Filter */}
              <div className="category-filter">
                <FaFilter className="filter-icon" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Grid */}
        <motion.section 
          className="skills-grid-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="container">
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading skills...</p>
              </div>
            ) : (
              <>
                <div className="skills-stats">
                  <p>
                    Showing {filteredSkills.length} of {skills.length} skills
                  </p>
                </div>

                <div className="skills-grid">
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      className="skill-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="skill-header">
                        <div className="skill-icon" style={{ backgroundColor: skill.color }}>
                          {React.createElement(getCategoryIcon(skill.category))}
                        </div>
                        <div className="skill-info">
                          <h3 className="skill-name">{skill.name}</h3>
                          <div className="skill-category">
                            {React.createElement(getCategoryIcon(skill.category))}
                            <span>{skill.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="skill-content">
                        <p className="skill-description">{skill.description}</p>
                        
                        <div className="skill-progress">
                          <div className="progress-header">
                            <span className="progress-label">Proficiency</span>
                            <span className="progress-percentage">{skill.proficiency}%</span>
                          </div>
                          <div className="progress-bar">
                            <motion.div 
                              className="progress-fill"
                              style={{ backgroundColor: skill.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                          <div className="progress-level">
                            {getProficiencyLevel(skill.proficiency)}
                          </div>
                        </div>

                        <div className="skill-meta">
                          <div className="skill-experience">
                            <span className="meta-label">Experience</span>
                            <span className="meta-value">{skill.yearsOfExperience} years</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredSkills.length === 0 && (
                  <div className="no-skills">
                    <h3>No skills found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Skills;

