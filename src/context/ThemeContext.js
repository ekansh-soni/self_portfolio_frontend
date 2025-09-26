/**
 * Theme Context
 * Manages application theme (light/dark mode) and provides theme methods
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  isDark: false
};

// Action types
const THEME_ACTIONS = {
  SET_THEME: 'SET_THEME',
  TOGGLE_THEME: 'TOGGLE_THEME'
};

// Reducer function
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload,
        isDark: action.payload === 'dark'
      };
    
    case THEME_ACTIONS.TOGGLE_THEME:
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      return {
        ...state,
        theme: newTheme,
        isDark: newTheme === 'dark'
      };
    
    default:
      return state;
  }
};

// Create context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  /**
   * Apply theme to document and localStorage
   */
  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', state.theme);
    
    // Store theme in localStorage
    localStorage.setItem('theme', state.theme);
    
    // Update body class for additional styling
    document.body.className = state.theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [state.theme]);

  /**
   * Set specific theme
   * @param {string} theme - Theme name ('light' or 'dark')
   */
  const setTheme = (theme) => {
    if (theme === 'light' || theme === 'dark') {
      dispatch({
        type: THEME_ACTIONS.SET_THEME,
        payload: theme
      });
    }
  };

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_THEME });
  };

  /**
   * Get theme-specific color
   * @param {string} colorName - Color name (e.g., 'primary', 'background')
   * @returns {string} Color value
   */
  const getThemeColor = (colorName) => {
    const colors = {
      light: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: '#ffffff',
        surface: '#f9fafb',
        text: '#111827',
        textSecondary: '#6b7280',
        border: '#e5e7eb',
        shadow: 'rgba(0, 0, 0, 0.1)'
      },
      dark: {
        primary: '#60a5fa',
        secondary: '#a78bfa',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#ffffff',
        textSecondary: '#cbd5e1',
        border: '#475569',
        shadow: 'rgba(0, 0, 0, 0.3)'
      }
    };

    return colors[state.theme]?.[colorName] || colors.light[colorName];
  };

  /**
   * Get theme-specific CSS variables
   * @returns {Object} CSS variables object
   */
  const getThemeVariables = () => {
    return {
      '--theme-primary': getThemeColor('primary'),
      '--theme-secondary': getThemeColor('secondary'),
      '--theme-background': getThemeColor('background'),
      '--theme-surface': getThemeColor('surface'),
      '--theme-text': getThemeColor('text'),
      '--theme-text-secondary': getThemeColor('textSecondary'),
      '--theme-border': getThemeColor('border'),
      '--theme-shadow': getThemeColor('shadow')
    };
  };

  // Context value
  const value = {
    ...state,
    setTheme,
    toggleTheme,
    getThemeColor,
    getThemeVariables
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default ThemeContext;

