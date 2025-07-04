import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

// Theme Context provides dark/light mode functionality across the app
// This enables users to switch between themes for better accessibility and preference

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme based on system preference
  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    setIsDark(systemTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Define comprehensive color palette for both light and dark themes
  const colors = {
    primary: '#1DA1F2',
    secondary: '#8B5CF6', 
    accent: '#F472B6',
    background: isDark ? '#000000' : '#FFFFFF',
    surface: isDark ? '#1A1A1A' : '#F8F9FA',
    text: isDark ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDark ? '#9CA3AF' : '#6B7280',
    border: isDark ? '#374151' : '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};