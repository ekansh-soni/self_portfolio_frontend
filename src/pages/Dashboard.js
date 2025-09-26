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
  FaCog
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  const [stats, setStats] = useState({
    totalProjects: 12,
    totalViews: 2450,
    totalLikes: 89,
    profileViews: 156
  });

  const [recentProjects] = useState([
    {
      id: 1,
      title: 'E-Commerce Platform',
      status: 'Published',
      views: 1250,
      likes: 45,
      lastUpdated: '2023-12-01'
    },
    {
      id: 2,
      title: 'Task Management App',
      status: 'Draft',
      views: 0,
      likes: 0,
      lastUpdated: '2023-11-28'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      status: 'Published',
      views: 750,
      likes: 28,
      lastUpdated: '2023-11-15'
    }
  ]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
                <button className="btn btn-primary">
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
                    <button className="btn btn-outline">View All</button>
                  </div>
                  
                  <div className="projects-table">
                    <div className="table-header">
                      <div>Project</div>
                      <div>Status</div>
                      <div>Views</div>
                      <div>Likes</div>
                      <div>Actions</div>
                    </div>
                    
                    {recentProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        className="table-row"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div className="project-info">
                          <h4 className="project-title">{project.title}</h4>
                          <p className="project-date">Updated {project.lastUpdated}</p>
                        </div>
                        <div className="project-status">
                          <span className={`status-badge ${project.status.toLowerCase()}`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="project-views">{project.views}</div>
                        <div className="project-likes">{project.likes}</div>
                        <div className="project-actions">
                          <button className="action-btn" title="View">
                            <FaEye />
                          </button>
                          <button className="action-btn" title="Edit">
                            <FaEdit />
                          </button>
                          <button className="action-btn" title="Delete">
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="dashboard-projects">
                <div className="section-header">
                  <h2>Manage Projects</h2>
                  <button className="btn btn-primary">
                    <FaPlus />
                    Add Project
                  </button>
                </div>
                <p>Project management interface will be implemented here.</p>
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
      </motion.div>
    </>
  );
};

export default Dashboard;

