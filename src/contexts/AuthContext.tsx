import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, User } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error('Error parsing stored user data:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Demo users with Indian names and different cities
      const demoUsers = [
        {
          id: '1',
          email: 'arjun.sharma@company.com',
          password: 'password123',
          firstName: 'Arjun',
          lastName: 'Sharma',
          department: 'Engineering',
          city: 'Bangalore',
          role: 'EMPLOYEE' as const
        },
        {
          id: '2',
          email: 'priya.patel@company.com',
          password: 'password123',
          firstName: 'Priya',
          lastName: 'Patel',
          department: 'Human Resources',
          city: 'Mumbai',
          role: 'HR' as const
        },
        {
          id: '3',
          email: 'rajesh.kumar@company.com',
          password: 'password123',
          firstName: 'Rajesh',
          lastName: 'Kumar',
          department: 'IT',
          city: 'Delhi',
          role: 'ADMIN' as const
        },
        {
          id: '4',
          email: 'anita.singh@company.com',
          password: 'password123',
          firstName: 'Anita',
          lastName: 'Singh',
          department: 'Finance',
          city: 'Pune',
          role: 'EMPLOYEE' as const
        },
        {
          id: '5',
          email: 'vikram.reddy@company.com',
          password: 'password123',
          firstName: 'Vikram',
          lastName: 'Reddy',
          department: 'Sales',
          city: 'Hyderabad',
          role: 'EMPLOYEE' as const
        },
        {
          id: '6',
          email: 'kavya.nair@company.com',
          password: 'password123',
          firstName: 'Kavya',
          lastName: 'Nair',
          department: 'Marketing',
          city: 'Chennai',
          role: 'EMPLOYEE' as const
        },
        {
          id: '7',
          email: 'rohit.gupta@company.com',
          password: 'password123',
          firstName: 'Rohit',
          lastName: 'Gupta',
          department: 'Operations',
          city: 'Kolkata',
          role: 'EMPLOYEE' as const
        },
        {
          id: '8',
          email: 'sneha.joshi@company.com',
          password: 'password123',
          firstName: 'Sneha',
          lastName: 'Joshi',
          department: 'Design',
          city: 'Ahmedabad',
          role: 'EMPLOYEE' as const
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Find matching user
      const foundUser = demoUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (!foundUser) {
        setError('Invalid credentials. Please use the demo accounts or check your email/password.');
        return false;
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      const token = `demo-token-${foundUser.id}-${Date.now()}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      
      return true;
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};