import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  login: (email: string, password: string, asAdmin?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  switchRole: (role: 'admin' | 'customer') => void;
}

const DEFAULT_ADMIN: UserProfile = {
  id: 'admin-1',
  fullName: 'David Muhwana',
  email: 'elviselegantcloset@gmail.com',
  phone: '+256 778 781601',
  role: 'admin',
  createdAt: '2025-01-01T00:00:00Z',
};

const DEFAULT_CUSTOMER: UserProfile = {
  id: 'cust-1',
  fullName: 'David Muhwana',
  email: 'david@gmail.com',
  phone: '+256 700 123 456',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      label: 'Home Delivery',
      address: 'Plot 12, Kampala Road',
      city: 'Kampala',
      region: 'Central Region, Uganda',
      isDefault: true,
    }
  ],
  createdAt: '2025-07-01T00:00:00Z',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('eec_auth_user');
      if (stored) return JSON.parse(stored);
      // Default to logged-in customer for effortless testing
      return DEFAULT_CUSTOMER;
    } catch {
      return DEFAULT_CUSTOMER;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('eec_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eec_auth_user');
    }
  }, [user]);

  const login = async (email: string, _password: string, asAdmin = false): Promise<{ success: boolean; error?: string }> => {
    if (asAdmin || email.toLowerCase().includes('admin') || email.toLowerCase().includes('elvis')) {
      const adminUser: UserProfile = {
        ...DEFAULT_ADMIN,
        email: email || DEFAULT_ADMIN.email,
      };
      setUser(adminUser);
      return { success: true };
    }

    const customerUser: UserProfile = {
      id: `cust-${Date.now()}`,
      fullName: email.split('@')[0].replace('.', ' '),
      email,
      phone: '+256 700 123 456',
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setUser(customerUser);
    return { success: true };
  };

  const register = async (name: string, email: string, phone: string, _password: string) => {
    const newUser: UserProfile = {
      id: `cust-${Date.now()}`,
      fullName: name,
      email,
      phone,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated });
    }
  };

  const switchRole = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      setUser(DEFAULT_ADMIN);
    } else {
      setUser(DEFAULT_CUSTOMER);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
