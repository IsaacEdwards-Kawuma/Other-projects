import React, { createContext, useContext, useState, useEffect } from 'react';

// Authentication Context manages user login state and user data
// This provides secure authentication across the entire app

interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  verified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string, displayName: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state (check if user is logged in)
  useEffect(() => {
    // In a real app, this would check stored tokens or session
    // For demo purposes, we'll simulate a logged-in user
    setTimeout(() => {
      setUser({
        id: '1',
        username: 'john_doe',
        email: 'john@example.com',
        displayName: 'John Doe',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        bio: 'Tech enthusiast & coffee lover ☕️',
        followers: 1234,
        following: 567,
        verified: true,
        createdAt: '2024-01-15',
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email && password) {
      setUser({
        id: '1',
        username: 'john_doe',
        email,
        displayName: 'John Doe',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        bio: 'Tech enthusiast & coffee lover ☕️',
        followers: 1234,
        following: 567,
        verified: true,
        createdAt: '2024-01-15',
      });
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, username: string, displayName: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email && password && username && displayName) {
      setUser({
        id: '1',
        username,
        email,
        displayName,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        bio: 'New to the platform!',
        followers: 0,
        following: 0,
        verified: false,
        createdAt: new Date().toISOString(),
      });
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};