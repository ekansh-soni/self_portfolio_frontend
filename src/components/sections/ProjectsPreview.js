/**
 * Projects Preview Section Component
 * Showcase of featured projects with links to full projects page
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { projectsAPI } from '../../services/api';
import './ProjectsPreview.css';

const ProjectsPreview = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsAPI.getProjects({ 
          limit: 6, 
          featured: true 
        });
        setProjects(response.data.data.projects || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        // Fallback to empty array if API fails
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <motion.section 
      className="projects-preview"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.div 
          className="projects-preview-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="projects-preview-title">Featured Projects</h2>
          <p className="projects-preview-description">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </motion.div>

        {loading ? (
          <div className="projects-loading">
            <FaSpinner className="spinner" />
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="projects-error">
            <p>{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="projects-empty">
            <p>No projects available at the moment.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={project._id}
                className={`project-card ${project.isFeatured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="project-image">
                  <img 
                    src={project.images && project.images.length > 0 ? project.images[0].url : '/api/placeholder/400/300'} 
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.shortDescription || project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies && project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          className="projects-preview-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/projects" className="btn btn-primary btn-lg">
            View All Projects
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsPreview;

