/**
 * Project Form Component
 * Form for creating and editing projects
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaTrash, FaUpload, FaSave } from 'react-icons/fa';
import { projectsAPI } from '../services/api';
import './ProjectForm.css';

const ProjectForm = ({ project, onClose, onSave, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: 'Web Development',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    startDate: '',
    endDate: '',
    status: 'Completed',
    isPublic: true,
    isFeatured: false,
    features: [],
    images: []
  });

  const [newTechnology, setNewTechnology] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
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

  const statuses = [
    'Planning',
    'In Progress',
    'Completed',
    'On Hold',
    'Cancelled'
  ];

  useEffect(() => {
    if (project && isEdit) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        shortDescription: project.shortDescription || '',
        category: project.category || 'Web Development',
        technologies: project.technologies || [],
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        status: project.status || 'Completed',
        isPublic: project.isPublic !== undefined ? project.isPublic : true,
        isFeatured: project.isFeatured || false,
        features: project.features || [],
        images: project.images || []
      });
    }
  }, [project, isEdit]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload to a service like Cloudinary
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      publicId: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      caption: file.name
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (formData.endDate && formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const projectData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : null
      };

      if (isEdit) {
        await projectsAPI.updateProject(project.id, projectData);
      } else {
        await projectsAPI.createProject(projectData);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      setErrors({ submit: 'Failed to save project. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="project-form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="project-form-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="project-form-header">
          <h2>{isEdit ? 'Edit Project' : 'Add New Project'}</h2>
          <button 
            className="close-btn"
            onClick={onClose}
            type="button"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label htmlFor="title">Project Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? 'error' : ''}
                  placeholder="Enter project title"
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="shortDescription">Short Description *</label>
                <input
                  type="text"
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  className={errors.shortDescription ? 'error' : ''}
                  placeholder="Brief description (max 200 characters)"
                  maxLength={200}
                />
                {errors.shortDescription && <span className="error-message">{errors.shortDescription}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Full Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={errors.description ? 'error' : ''}
                  placeholder="Detailed project description"
                  rows={4}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="form-section">
              <h3>Technologies</h3>
              
              <div className="form-group">
                <label>Technologies Used *</label>
                <div className="tech-input-group">
                  <input
                    type="text"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Add technology (e.g., React, Node.js)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                  />
                  <button 
                    type="button"
                    onClick={handleAddTechnology}
                    className="add-btn"
                  >
                    <FaPlus />
                  </button>
                </div>
                {errors.technologies && <span className="error-message">{errors.technologies}</span>}
                
                <div className="tech-tags">
                  {formData.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                      <button 
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="remove-tech"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Links */}
            <div className="form-section">
              <h3>Project Links</h3>
              
              <div className="form-group">
                <label htmlFor="githubUrl">GitHub URL</label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repository"
                />
              </div>

              <div className="form-group">
                <label htmlFor="liveUrl">Live Demo URL</label>
                <input
                  type="url"
                  id="liveUrl"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://your-project.com"
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="form-section">
              <h3>Project Timeline</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date *</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={errors.startDate ? 'error' : ''}
                  />
                  {errors.startDate && <span className="error-message">{errors.startDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={errors.endDate ? 'error' : ''}
                  />
                  {errors.endDate && <span className="error-message">{errors.endDate}</span>}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="form-section">
              <h3>Key Features</h3>
              
              <div className="form-group">
                <div className="feature-input-group">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a key feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                  />
                  <button 
                    type="button"
                    onClick={handleAddFeature}
                    className="add-btn"
                  >
                    <FaPlus />
                  </button>
                </div>
                
                <div className="feature-list">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span>{feature}</span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveFeature(feature)}
                        className="remove-feature"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="form-section">
              <h3>Project Images</h3>
              
              <div className="form-group">
                <label htmlFor="images">Upload Images</label>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
                <label htmlFor="images" className="file-input-label">
                  <FaUpload />
                  Choose Images
                </label>
                
                <div className="image-preview">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.url} alt={`Project ${index + 1}`} />
                      <button 
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="remove-image"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="form-section">
              <h3>Project Settings</h3>
              
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Make project public
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Feature this project
                </label>
              </div>
            </div>
          </div>

          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  {isEdit ? 'Update Project' : 'Create Project'}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProjectForm;
