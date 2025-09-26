/**
 * Dashboard Page Component
 * User dashboard for managing portfolio content
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash,
  FaChartBar,
  FaUsers,
  FaProjectDiagram,
  FaCog,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import ProjectForm from '../components/ProjectForm';
import { projectsAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data - replace with actual API calls
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalViews: 0,
    totalLikes: 0,
    profileViews: 0
  });

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
    'UI/UX Design',
    'Other'
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, selectedCategory]);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const response = await projectsAPI.getMyProjects();
      setProjects(response.data.projects || []);
      
      // Calculate stats
      const projects = response.data.projects || [];
      const totalViews = projects.reduce((sum, project) => sum + (project.views || 0), 0);
      const totalLikes = projects.reduce((sum, project) => sum + (project.likes || 0), 0);
      
      setStats({
        totalProjects: projects.length,
        totalViews,
        totalLikes,
        profileViews: 0 // This would come from profile API
      });
    } catch (error) {
      console.error('Error loading projects:', error);
      // Set empty state on error
      setProjects([]);
      setStats({
        totalProjects: 0,
        totalViews: 0,
        totalLikes: 0,
        profileViews: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterProjects = () => {
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
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.deleteProject(projectId);
        await loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleProjectSave = () => {
    setShowProjectForm(false);
    setEditingProject(null);
    loadProjects();
  };

  const handleCloseForm = () => {
    setShowProjectForm(false);
    setEditingProject(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="dashboard-error">
        <h2>Access Denied</h2>
        <p>Please log in to access your dashboard.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Portfolio Management</title>
        <meta 
          name="description" 
          content="Manage your portfolio content, projects, and profile settings from your personal dashboard." 
        />
      </Helmet>

      <motion.div 
        className="dashboard-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.header 
          className="dashboard-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container">
            <div className="dashboard-header-content">
              <div className="dashboard-title">
                <h1>Dashboard</h1>
                <p>Welcome back, {user?.firstName}!</p>
              </div>
              <div className="dashboard-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleAddProject}
                >
                  <FaPlus />
                  New Project
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Navigation */}
        <motion.nav 
          className="dashboard-nav"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container">
            <div className="dashboard-tabs">
              {[
                { id: 'overview', label: 'Overview', icon: FaChartBar },
                { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
                { id: 'profile', label: 'Profile', icon: FaUsers },
                { id: 'settings', label: 'Settings', icon: FaCog }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Content */}
        <motion.main 
          className="dashboard-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="container">
            {activeTab === 'overview' && (
              <div className="dashboard-overview">
                {/* Stats Cards */}
                <div className="stats-grid">
                  {[
                    { label: 'Total Projects', value: stats.totalProjects, icon: FaProjectDiagram, color: 'blue' },
                    { label: 'Total Views', value: stats.totalViews, icon: FaEye, color: 'green' },
                    { label: 'Total Likes', value: stats.totalLikes, icon: FaUsers, color: 'purple' },
                    { label: 'Profile Views', value: stats.profileViews, icon: FaChartBar, color: 'orange' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className={`stat-card ${stat.color}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="stat-icon">
                        <stat.icon />
                      </div>
                      <div className="stat-content">
                        <h3 className="stat-value">{stat.value.toLocaleString()}</h3>
                        <p className="stat-label">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Projects */}
                <div className="recent-projects">
                  <div className="section-header">
                    <h2>Recent Projects</h2>
                    <button 
                      className="btn btn-outline"
                      onClick={() => setActiveTab('projects')}
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="projects-table">
                    <div className="table-header">
                      <div>Project</div>
                      <div>Status</div>
                      <div>Views</div>
                      <div>Likes</div>
                      <div>Actions</div>
                    </div>
                    
                    {projects.length > 0 ? (
                      projects.slice(0, 3).map((project, index) => (
                        <motion.div
                          key={project.id}
                          className="table-row"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <div className="project-info">
                            <h4 className="project-title">{project.title}</h4>
                            <p className="project-date">Updated {new Date(project.updatedAt || project.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="project-status">
                            <span className={`status-badge ${project.status?.toLowerCase().replace(' ', '-')}`}>
                              {project.status}
                            </span>
                          </div>
                          <div className="project-views">{project.views || 0}</div>
                          <div className="project-likes">{project.likes || 0}</div>
                          <div className="project-actions">
                            <button 
                              className="action-btn" 
                              title="View"
                              onClick={() => window.open(project.liveUrl, '_blank')}
                              disabled={!project.liveUrl}
                            >
                              <FaEye />
                            </button>
                            <button 
                              className="action-btn" 
                              title="Edit"
                              onClick={() => handleEditProject(project)}
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="action-btn" 
                              title="Delete"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="no-projects-overview">
                        <p>No projects yet. Create your first project to get started!</p>
                        <button 
                          className="btn btn-primary"
                          onClick={handleAddProject}
                        >
                          <FaPlus />
                          Create First Project
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="dashboard-projects">
                <div className="section-header">
                  <h2>Manage Projects</h2>
                  <button 
                    className="btn btn-primary"
                    onClick={handleAddProject}
                  >
                    <FaPlus />
                    Add Project
                  </button>
                </div>

                {/* Filters */}
                <div className="projects-filters">
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

                {/* Projects Grid */}
                <div className="projects-grid">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="project-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="project-image">
                        <img 
                          src={project.images?.[0]?.url || '/api/placeholder/400/300'} 
                          alt={project.title}
                        />
                        {project.isFeatured && (
                          <div className="featured-badge">Featured</div>
                        )}
                      </div>

                      <div className="project-content">
                        <div className="project-header">
                          <h3 className="project-title">{project.title}</h3>
                          <div className="project-category">{project.category}</div>
                        </div>

                        <p className="project-description">{project.shortDescription}</p>

                        <div className="project-technologies">
                          {project.technologies?.slice(0, 3).map(tech => (
                            <span key={tech} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                          {project.technologies?.length > 3 && (
                            <span className="tech-tag">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="project-footer">
                          <div className="project-stats">
                            <span className="project-views">
                              {project.views || 0} views
                            </span>
                            <span className="project-likes">
                              {project.likes || 0} likes
                            </span>
                          </div>
                          <div className="project-status">
                            <span className={`status-badge ${project.status?.toLowerCase().replace(' ', '-')}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>

                        <div className="project-actions">
                          <button 
                            className="action-btn"
                            onClick={() => handleEditProject(project)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="action-btn"
                            onClick={() => window.open(project.liveUrl, '_blank')}
                            title="View Live"
                            disabled={!project.liveUrl}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="action-btn danger"
                            onClick={() => handleDeleteProject(project.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredProjects.length === 0 && !isLoading && (
                  <div className="no-projects">
                    <h3>No projects found</h3>
                    <p>Try adjusting your search or filter criteria, or create your first project.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={handleAddProject}
                    >
                      <FaPlus />
                      Create Your First Project
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="dashboard-profile">
                <div className="section-header">
                  <h2>Profile Settings</h2>
                </div>
                <p>Profile management interface will be implemented here.</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="dashboard-settings">
                <div className="section-header">
                  <h2>Account Settings</h2>
                </div>
                <p>Settings interface will be implemented here.</p>
              </div>
            )}
          </div>
        </motion.main>

        {/* Project Form Modal */}
        {showProjectForm && (
          <ProjectForm
            project={editingProject}
            onClose={handleCloseForm}
            onSave={handleProjectSave}
            isEdit={!!editingProject}
          />
        )}
      </motion.div>
    </>
  );
};

export default Dashboard;

