import { api } from './api';

export const authService = {
  // Automatically confirm user for testing/development
  async signUpWithAutoConfirm(email: string, password: string) {
    try {
      const data = await api.signup(email, password);
      // Store token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return { user: data, error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { user: null, error };
    }
  },

  // Automatically log in for testing/development
  async signInWithAutoConfirm(email: string, password: string) {
    try {
      const data = await api.login(email, password);
      // Store token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return { user: data, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { user: null, error };
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const user = await api.getMe();
      return user;
    } catch (error) {
      return null;
    }
  },
  
  logout() {
    localStorage.removeItem('token');
  }
};