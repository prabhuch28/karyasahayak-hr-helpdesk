import { useState, useEffect } from 'react';
import { authAPI, type AuthResponse, type LoginRequest, type SignupRequest } from '../services/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (loginData: LoginRequest): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: AuthResponse = await authAPI.login(loginData);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      const userData = {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (signupData: SignupRequest): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      await authAPI.signup(signupData);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };
};