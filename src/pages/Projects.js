/**
 * Projects Page Component
 * Showcase of all projects with filtering and search
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaSearch, 
  FaFilter,
  FaCode,
  FaMobile,
  FaDesktop
} from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'Desktop Application',
    'Data Science',
    'Machine Learning',
    'AI/ML',
    'Game Development',
    'DevOps',
    'UI/UX Design'
  ];

  // Mock data - replace with actual API call
  const mockProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
      shortDescription: 'Full-stack e-commerce solution with modern technologies',
      image: '/api/placeholder/400/300',
      category: 'Web Development',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      githubUrl: 'https://github.com/yourusername/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      status: 'Completed',
      startDate: '2023-01-01',
      endDate: '2023-06-01',
      isFeatured: true,
      views: 1250,
      likes: 45
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
      shortDescription: 'Collaborative task management with real-time updates',
      image: '/api/placeholder/400/300',
      category: 'Web Development',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Socket.io'],
      githubUrl: 'https://github.com/yourusername/taskmanager',
      liveUrl: 'https://taskmanager-demo.com',
      status: 'Completed',
      startDate: '2023-03-01',
      endDate: '2023-08-01',
      isFeatured: true,
      views: 980,
      likes: 32
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      shortDescription: 'Weather app with location-based forecasts',
      image: '/api/placeholder/400/300',
      category: 'Web Development',
      technologies: ['React', 'API Integration', 'Chart.js', 'Geolocation'],
      githubUrl: 'https://github.com/yourusername/weather',
      liveUrl: 'https://weather-demo.com',
      status: 'Completed',
      startDate: '2023-05-01',
      endDate: '2023-07-01',
      isFeatured: false,
      views: 750,
      likes: 28
    },
    {
      id: 4,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication, transaction management, and financial analytics.',
      shortDescription: 'Secure mobile banking with biometric authentication',
      image: '/api/placeholder/400/300',
      category: 'Mobile Development',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Biometric Auth'],
      githubUrl: 'https://github.com/yourusername/banking-app',
      liveUrl: 'https://banking-demo.com',
      status: 'In Progress',
      startDate: '2023-09-01',
      endDate: null,
      isFeatured: true,
      views: 1100,
      likes: 67
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Development':
        return FaCode;
      case 'Mobile Development':
        return FaMobile;
      case 'Desktop Application':
        return FaDesktop;
      default:
        return FaCode;
    }
  };

  return (
    <>
      <Helmet>
        <title>Projects - Portfolio Showcase</title>
        <meta 
          name="description" 
          content="Explore my portfolio of web development projects, mobile applications, and innovative solutions built with modern technologies." 
        />
      </Helmet>

      <motion.div 
        className="projects-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.section 
          className="projects-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <div className="projects-header-content">
              <h1 className="projects-title">My Projects</h1>
              <p className="projects-description">
                A collection of projects that showcase my skills, creativity, and passion for development.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Filters Section */}
        <motion.section 
          className="projects-filters"
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
                  placeholder="Search projects..."
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

        {/* Projects Grid */}
        <motion.section 
          className="projects-grid-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="container">
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading projects...</p>
              </div>
            ) : (
              <>
                <div className="projects-stats">
                  <p>
                    Showing {filteredProjects.length} of {projects.length} projects
                  </p>
                </div>

                <div className="projects-grid">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className={`project-card ${project.isFeatured ? 'featured' : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="project-image">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          loading="lazy"
                        />
                        <div className="project-overlay">
                          <div className="project-links">
                            <a 
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                              aria-label={`View ${project.title} on GitHub`}
                            >
                              <FaGithub />
                            </a>
                            <a 
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                              aria-label={`View ${project.title} live demo`}
                            >
                              <FaExternalLinkAlt />
                            </a>
                          </div>
                        </div>
                        {project.isFeatured && (
                          <div className="featured-badge">Featured</div>
                        )}
                      </div>

                      <div className="project-content">
                        <div className="project-header">
                          <h3 className="project-title">{project.title}</h3>
                          <div className="project-category">
                            {React.createElement(getCategoryIcon(project.category))}
                            <span>{project.category}</span>
                          </div>
                        </div>

                        <p className="project-description">{project.shortDescription}</p>

                        <div className="project-technologies">
                          {project.technologies.map(tech => (
                            <span key={tech} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="project-footer">
                          <div className="project-stats">
                            <span className="project-views">
                              {project.views} views
                            </span>
                            <span className="project-likes">
                              {project.likes} likes
                            </span>
                          </div>
                          <div className="project-status">
                            <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="no-projects">
                    <h3>No projects found</h3>
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

export default Projects;

