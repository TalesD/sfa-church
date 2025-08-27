import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isInMinistry: (ministryType: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserToStorage = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual Firebase authentication
      // For now, using mock data
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: UserRole.MEMBER,
        ministries: ['worship', 'kids'],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setUser(mockUser);
      await saveUserToStorage(mockUser);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual Firebase authentication
      // For now, using mock data
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: UserRole.MEMBER,
        ministries: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setUser(mockUser);
      await saveUserToStorage(mockUser);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    switch (permission) {
      case 'post_devotional':
        return user.role === UserRole.PASTOR;
      case 'manage_worship':
        return user.ministries.includes('worship') || user.role === UserRole.PASTOR;
      case 'manage_kids':
        return user.ministries.includes('kids') || user.role === UserRole.PASTOR;
      case 'manage_events':
        return user.role === UserRole.MINISTRY_LEADER || user.role === UserRole.PASTOR;
      case 'view_analytics':
        return user.role === UserRole.PASTOR || user.role === UserRole.ADMIN;
      default:
        return false;
    }
  };

  const isInMinistry = (ministryType: string): boolean => {
    if (!user) return false;
    return user.ministries.includes(ministryType);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    hasPermission,
    isInMinistry,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
