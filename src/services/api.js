/**
 * API Service
 * Axios configuration and API methods for portfolio application
 */

import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response time for debugging
    if (response.config.metadata) {
      const endTime = new Date();
      const duration = endTime - response.config.metadata.startTime;
      console.log(`API Request to ${response.config.url} took ${duration}ms`);
    }
    
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
          
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
        
        case 403:
          toast.error('Access denied. You do not have permission to perform this action.');
          break;
        
        case 404:
          toast.error('Resource not found.');
          break;
        
        case 422:
          // Validation errors
          if (data.errors && Array.isArray(data.errors)) {
            data.errors.forEach(error => {
              toast.error(`${error.field}: ${error.message}`);
            });
          } else {
            toast.error(data.message || 'Validation failed');
          }
          break;
        
        case 429:
          toast.error('Too many requests. Please try again later.');
          break;
        
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        
        default:
          toast.error(data.message || 'An error occurred');
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.');
    } else {
      // Other error
      toast.error('An unexpected error occurred');
    }
    
    return Promise.reject(error);
  }
);

// API Methods

/**
 * Authentication API
 */
export const authAPI = {
  // Login user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Register user
  register: (userData) => api.post('/auth/register', userData),
  
  // Get current user
  getCurrentUser: () => api.get('/auth/me'),
  
  // Update user
  updateUser: (userData) => api.put('/auth/me', userData),
  
  // Logout user
  logout: () => api.post('/auth/logout')
};

/**
 * Profile API
 */
export const profileAPI = {
  // Get current user's profile
  getMyProfile: () => api.get('/profile/me'),
  
  // Update current user's profile
  updateMyProfile: (profileData) => api.put('/profile/me', profileData),
  
  // Get public profile by user ID
  getPublicProfile: (userId) => api.get(`/profile/${userId}`),
  
  // Update profile visibility
  updateVisibility: (isPublic) => api.put('/profile/visibility', { isPublic }),
  
  // Delete profile
  deleteProfile: () => api.delete('/profile/me')
};

/**
 * Projects API
 */
export const projectsAPI = {
  // Get all public projects
  getProjects: (params = {}) => api.get('/projects', { params }),
  
  // Get current user's projects
  getMyProjects: (params = {}) => api.get('/projects/me', { params }),
  
  // Get project by ID
  getProject: (id) => api.get(`/projects/${id}`),
  
  // Create new project
  createProject: (projectData) => api.post('/projects', projectData),
  
  // Update project
  updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),
  
  // Delete project
  deleteProject: (id) => api.delete(`/projects/${id}`),
  
  // Like project
  likeProject: (id) => api.put(`/projects/${id}/like`)
};

/**
 * Skills API
 */
export const skillsAPI = {
  // Get all public skills
  getSkills: (params = {}) => api.get('/skills', { params }),
  
  // Get current user's skills
  getMySkills: (params = {}) => api.get('/skills/me', { params }),
  
  // Get skill categories
  getCategories: () => api.get('/skills/categories'),
  
  // Get skill by ID
  getSkill: (id) => api.get(`/skills/${id}`),
  
  // Create new skill
  createSkill: (skillData) => api.post('/skills', skillData),
  
  // Update skill
  updateSkill: (id, skillData) => api.put(`/skills/${id}`, skillData),
  
  // Delete skill
  deleteSkill: (id) => api.delete(`/skills/${id}`),
  
  // Update skill priority
  updatePriority: (id, priority) => api.put(`/skills/${id}/priority`, { priority })
};

/**
 * Experience API
 */
export const experienceAPI = {
  // Get all public experiences
  getExperiences: (params = {}) => api.get('/experience', { params }),
  
  // Get current user's experiences
  getMyExperiences: (params = {}) => api.get('/experience/me', { params }),
  
  // Get experience by ID
  getExperience: (id) => api.get(`/experience/${id}`),
  
  // Create new experience
  createExperience: (experienceData) => api.post('/experience', experienceData),
  
  // Update experience
  updateExperience: (id, experienceData) => api.put(`/experience/${id}`, experienceData),
  
  // Delete experience
  deleteExperience: (id) => api.delete(`/experience/${id}`),
  
  // Update experience order
  updateOrder: (id, order) => api.put(`/experience/${id}/order`, { order })
};

/**
 * Education API
 */
export const educationAPI = {
  // Get all public education records
  getEducation: (params = {}) => api.get('/education', { params }),
  
  // Get current user's education
  getMyEducation: (params = {}) => api.get('/education/me', { params }),
  
  // Get education by ID
  getEducationRecord: (id) => api.get(`/education/${id}`),
  
  // Create new education record
  createEducation: (educationData) => api.post('/education', educationData),
  
  // Update education record
  updateEducation: (id, educationData) => api.put(`/education/${id}`, educationData),
  
  // Delete education record
  deleteEducation: (id) => api.delete(`/education/${id}`),
  
  // Update education order
  updateOrder: (id, order) => api.put(`/education/${id}/order`, { order })
};

/**
 * Contact API
 */
export const contactAPI = {
  // Send contact form
  sendMessage: (messageData) => api.post('/contact', messageData),
  
  // Check contact service health
  checkHealth: () => api.get('/contact/health')
};

/**
 * Utility functions
 */

/**
 * Upload file to server
 * @param {File} file - File to upload
 * @param {string} endpoint - Upload endpoint
 * @returns {Promise} Upload response
 */
export const uploadFile = async (file, endpoint = '/upload') => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Download file from server
 * @param {string} url - File URL
 * @param {string} filename - Download filename
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Get API health status
 * @returns {Promise} Health check response
 */
export const checkAPIHealth = () => api.get('/health');

export default api;

