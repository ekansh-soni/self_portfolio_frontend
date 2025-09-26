/**
 * Education Page Component
 * Academic background and education showcase
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaSearch,
  FaFilter,
  FaExternalLinkAlt
} from 'react-icons/fa';
import './Education.css';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [filteredEducation, setFilteredEducation] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const statusOptions = ['All', 'Current', 'Completed'];

  // Mock data - replace with actual API call
  const mockEducation = [
    {
      id: 1,
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      fieldOfStudy: 'Computer Science',
      location: 'Stanford, CA',
      startDate: '2021-09-01',
      endDate: '2023-06-01',
      isCurrent: false,
      gpa: 3.8,
      gpaScale: 4.0,
      description: 'Advanced studies in computer science with focus on machine learning, artificial intelligence, and software engineering.',
      achievements: [
        'Graduated Magna Cum Laude',
        'Published research paper on machine learning algorithms',
        'Led student research group on AI applications'
      ],
      coursework: [
        'Advanced Algorithms',
        'Machine Learning',
        'Artificial Intelligence',
        'Software Engineering',
        'Database Systems',
        'Computer Networks'
      ],
      institutionWebsite: 'https://stanford.edu',
      institutionLogo: '/api/placeholder/100/100'
    },
    {
      id: 2,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      fieldOfStudy: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2017-09-01',
      endDate: '2021-05-01',
      isCurrent: false,
      gpa: 3.6,
      gpaScale: 4.0,
      description: 'Comprehensive computer science education covering programming, algorithms, data structures, and software development.',
      achievements: [
        'Dean\'s List for 6 consecutive semesters',
        'President of Computer Science Club',
        'Completed senior capstone project on web development'
      ],
      coursework: [
        'Data Structures and Algorithms',
        'Object-Oriented Programming',
        'Computer Architecture',
        'Operating Systems',
        'Database Management',
        'Web Development'
      ],
      institutionWebsite: 'https://berkeley.edu',
      institutionLogo: '/api/placeholder/100/100'
    },
    {
      id: 3,
      degree: 'Certificate in Full-Stack Development',
      institution: 'General Assembly',
      fieldOfStudy: 'Software Development',
      location: 'San Francisco, CA',
      startDate: '2023-07-01',
      endDate: '2023-10-01',
      isCurrent: false,
      gpa: null,
      gpaScale: null,
      description: 'Intensive 12-week program covering modern web development technologies including React, Node.js, and database management.',
      achievements: [
        'Completed capstone project: E-commerce platform',
        'Achieved 95% average across all modules',
        'Received recommendation from lead instructor'
      ],
      coursework: [
        'React Development',
        'Node.js and Express',
        'MongoDB and SQL',
        'Git and Version Control',
        'Deployment and DevOps',
        'Agile Development'
      ],
      institutionWebsite: 'https://generalassemb.ly',
      institutionLogo: '/api/placeholder/100/100'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEducation(mockEducation);
      setFilteredEducation(mockEducation);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = education;

    // Filter by status
    if (selectedStatus === 'Current') {
      filtered = filtered.filter(edu => edu.isCurrent);
    } else if (selectedStatus === 'Completed') {
      filtered = filtered.filter(edu => !edu.isCurrent);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(edu =>
        edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        edu.coursework.some(course => 
          course.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredEducation(filtered);
  }, [education, searchTerm, selectedStatus]);

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
        <title>Education - Academic Background</title>
        <meta 
          name="description" 
          content="Explore my academic background, educational achievements, and continuous learning journey in computer science and technology." 
        />
      </Helmet>

      <motion.div 
        className="education-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.section 
          className="education-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <div className="education-header-content">
              <h1 className="education-title">Education</h1>
              <p className="education-description">
                My academic journey and continuous learning in computer science, 
                showcasing degrees, certifications, and educational achievements.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Filters Section */}
        <motion.section 
          className="education-filters"
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
                  placeholder="Search education..."
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

        {/* Education Timeline */}
        <motion.section 
          className="education-timeline-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="container">
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading education...</p>
              </div>
            ) : (
              <>
                <div className="education-stats">
                  <p>
                    Showing {filteredEducation.length} of {education.length} education records
                  </p>
                </div>

                <div className="education-timeline">
                  {filteredEducation.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className={`education-item ${edu.isCurrent ? 'current' : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="education-content">
                        <div className="education-header">
                          <div className="education-title-section">
                            <h3 className="education-degree">{edu.degree}</h3>
                            <div className="education-institution">
                              <FaGraduationCap className="education-icon" />
                              <span>{edu.institution}</span>
                              {edu.institutionWebsite && (
                                <a 
                                  href={edu.institutionWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="institution-link"
                                  aria-label={`Visit ${edu.institution} website`}
                                >
                                  <FaExternalLinkAlt />
                                </a>
                              )}
                            </div>
                            <div className="education-field">
                              {edu.fieldOfStudy}
                            </div>
                          </div>
                          
                          <div className="education-meta">
                            <div className="education-period">
                              <FaCalendarAlt className="education-icon" />
                              <span>
                                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                              </span>
                            </div>
                            <div className="education-location">
                              <FaMapMarkerAlt className="education-icon" />
                              <span>{edu.location}</span>
                            </div>
                            <div className="education-duration">
                              {getDuration(edu.startDate, edu.endDate)}
                            </div>
                            {edu.gpa && (
                              <div className="education-gpa">
                                GPA: {edu.gpa.toFixed(2)}/{edu.gpaScale}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="education-body">
                          <p className="education-description">{edu.description}</p>
                          
                          <div className="education-details">
                            <div className="achievements">
                              <h4>Key Achievements</h4>
                              <ul>
                                {edu.achievements.map((achievement, idx) => (
                                  <li key={idx}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="coursework">
                              <h4>Relevant Coursework</h4>
                              <div className="coursework-tags">
                                {edu.coursework.map(course => (
                                  <span key={course} className="course-tag">
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="education-timeline-dot">
                        <div className="timeline-dot"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredEducation.length === 0 && (
                  <div className="no-education">
                    <h3>No education found</h3>
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

export default Education;
