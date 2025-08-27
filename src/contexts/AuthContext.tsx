import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
  ministries: Ministry[];
}

export enum UserRole {
  MEMBER = 'member',
  LEADER = 'leader',
  PASTOR = 'pastor',
}

export enum Ministry {
  WORSHIP = 'worship',
  KIDS = 'kids',
  YOUTH = 'youth',
  ADMIN = 'admin',
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  hasMinistryAccess: (ministry: Ministry) => boolean;
  hasRoleAccess: (role: UserRole) => boolean;
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

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual Firebase auth
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: email,
      role: UserRole.MEMBER,
      ministries: [Ministry.WORSHIP, Ministry.YOUTH],
    };

    setUser(mockUser);
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const hasMinistryAccess = (ministry: Ministry): boolean => {
    if (!user) return false;
    return user.ministries.includes(ministry);
  };

  const hasRoleAccess = (role: UserRole): boolean => {
    if (!user) return false;
    
    const roleHierarchy = {
      [UserRole.MEMBER]: 1,
      [UserRole.LEADER]: 2,
      [UserRole.PASTOR]: 3,
    };

    return roleHierarchy[user.role] >= roleHierarchy[role];
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    updateProfile,
    hasMinistryAccess,
    hasRoleAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
