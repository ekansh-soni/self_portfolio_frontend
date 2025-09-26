/**
 * Experience Page Component
 * Professional work experience showcase
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaSearch,
  FaFilter,
  FaExternalLinkAlt
} from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const statusOptions = ['All', 'Current', 'Previous'];

  // Mock data - replace with actual API call
  const mockExperiences = [
    {
      id: 1,
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      employmentType: 'Full-time',
      startDate: '2022-01-01',
      endDate: null,
      isCurrent: true,
      description: 'Leading development of scalable web applications and mentoring junior developers. Responsible for architecting microservices and implementing CI/CD pipelines.',
      responsibilities: [
        'Lead development of microservices architecture',
        'Mentor junior developers and conduct code reviews',
        'Implement CI/CD pipelines and DevOps practices',
        'Collaborate with product managers and designers'
      ],
      achievements: [
        'Reduced application load time by 40%',
        'Implemented automated testing reducing bugs by 60%',
        'Led team of 5 developers successfully'
      ],
      skills: ['React', 'Node.js', 'AWS', 'Docker', 'MongoDB'],
      companyWebsite: 'https://techsolutions.com',
      companyLogo: '/api/placeholder/100/100'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      employmentType: 'Full-time',
      startDate: '2020-03-01',
      endDate: '2021-12-31',
      isCurrent: false,
      description: 'Developed responsive web applications using React and modern JavaScript frameworks. Worked closely with design teams to implement pixel-perfect UIs.',
      responsibilities: [
        'Develop responsive web applications using React',
        'Collaborate with design teams for UI implementation',
        'Optimize applications for performance and accessibility',
        'Participate in agile development processes'
      ],
      achievements: [
        'Improved page load speed by 35%',
        'Implemented accessibility standards (WCAG 2.1)',
        'Reduced client-side bundle size by 25%'
      ],
      skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Webpack'],
      companyWebsite: 'https://digitalagency.com',
      companyLogo: '/api/placeholder/100/100'
    },
    {
      id: 3,
      title: 'Junior Web Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      employmentType: 'Full-time',
      startDate: '2019-06-01',
      endDate: '2020-02-29',
      isCurrent: false,
      description: 'Built and maintained client websites using HTML, CSS, and JavaScript. Gained experience in full-stack development and version control.',
      responsibilities: [
        'Build and maintain client websites',
        'Implement responsive designs',
        'Debug and fix website issues',
        'Collaborate with senior developers'
      ],
      achievements: [
        'Successfully delivered 15+ client projects',
        'Learned version control and team collaboration',
        'Improved coding skills significantly'
      ],
      skills: ['HTML', 'CSS', 'JavaScript', 'Git', 'Bootstrap'],
      companyWebsite: 'https://startupxyz.com',
      companyLogo: '/api/placeholder/100/100'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setExperiences(mockExperiences);
      setFilteredExperiences(mockExperiences);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = experiences;

    // Filter by status
    if (selectedStatus === 'Current') {
      filtered = filtered.filter(exp => exp.isCurrent);
    } else if (selectedStatus === 'Previous') {
      filtered = filtered.filter(exp => !exp.isCurrent);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(exp =>
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredExperiences(filtered);
  }, [experiences, searchTerm, selectedStatus]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}`.trim();
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return (
    <>
      <Helmet>
        <title>Experience - Professional Work History</title>
        <meta 
          name="description" 
          content="Explore my professional work experience, career journey, and achievements in software development and technology." 
        />
      </Helmet>

      <motion.div 
        className="experience-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.section 
          className="experience-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <div className="experience-header-content">
              <h1 className="experience-title">Work Experience</h1>
              <p className="experience-description">
                My professional journey in software development, showcasing growth, 
                achievements, and the diverse projects I've contributed to.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Filters Section */}
        <motion.section 
          className="experience-filters"
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
                  placeholder="Search experience..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Status Filter */}
              <div className="status-filter">
                <FaFilter className="filter-icon" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="status-select"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section 
          className="experience-timeline-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="container">
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading experience...</p>
              </div>
            ) : (
              <>
                <div className="experience-stats">
                  <p>
                    Showing {filteredExperiences.length} of {experiences.length} experiences
                  </p>
                </div>

                <div className="experience-timeline">
                  {filteredExperiences.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      className={`experience-item ${experience.isCurrent ? 'current' : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="experience-content">
                        <div className="experience-header">
                          <div className="experience-title-section">
                            <h3 className="experience-title">{experience.title}</h3>
                            <div className="experience-company">
                              <FaBriefcase className="experience-icon" />
                              <span>{experience.company}</span>
                              {experience.companyWebsite && (
                                <a 
                                  href={experience.companyWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="company-link"
                                  aria-label={`Visit ${experience.company} website`}
                                >
                                  <FaExternalLinkAlt />
                                </a>
                              )}
                            </div>
                          </div>
                          
                          <div className="experience-meta">
                            <div className="experience-period">
                              <FaCalendarAlt className="experience-icon" />
                              <span>
                                {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                              </span>
                            </div>
                            <div className="experience-location">
                              <FaMapMarkerAlt className="experience-icon" />
                              <span>{experience.location}</span>
                            </div>
                            <div className="experience-duration">
                              {getDuration(experience.startDate, experience.endDate)}
                            </div>
                          </div>
                        </div>

                        <div className="experience-body">
                          <p className="experience-description">{experience.description}</p>
                          
                          <div className="experience-details">
                            <div className="responsibilities">
                              <h4>Key Responsibilities</h4>
                              <ul>
                                {experience.responsibilities.map((responsibility, idx) => (
                                  <li key={idx}>{responsibility}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="achievements">
                              <h4>Key Achievements</h4>
                              <ul>
                                {experience.achievements.map((achievement, idx) => (
                                  <li key={idx}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="experience-skills">
                            <h4>Technologies Used</h4>
                            <div className="skills-tags">
                              {experience.skills.map(skill => (
                                <span key={skill} className="skill-tag">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="experience-timeline-dot">
                        <div className="timeline-dot"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredExperiences.length === 0 && (
                  <div className="no-experience">
                    <h3>No experience found</h3>
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

export default Experience;
