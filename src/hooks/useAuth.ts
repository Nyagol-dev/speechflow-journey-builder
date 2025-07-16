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
      const user = 'user' in response ? response.user : response.data?.user;
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
      const user = 'user' in response ? response.user : response.data?.user;
      setUser(user || null);
      return user;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    signUp, 
    signIn, 
    user, 
    loading, 
    error 
  };
};