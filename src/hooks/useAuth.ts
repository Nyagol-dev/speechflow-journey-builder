import { useState } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signUpWithAutoConfirm(email, password);
      const user = response.user;
      setUser(user || null);
      return user;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signInWithAutoConfirm(email, password);
      const user = response.user;
      setUser(user || null);
      return user;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkUser = async () => {
    setLoading(true);
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { 
    signUp, 
    signIn, 
    checkUser,
    user, 
    loading, 
    error 
  };
};