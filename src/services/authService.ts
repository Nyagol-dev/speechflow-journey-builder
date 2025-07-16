import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create a client with service role for admin operations
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export const authService = {
  // Automatically confirm user for testing/development
  async signUpWithAutoConfirm(email: string, password: string) {
    // If in development, automatically confirm the user
    if (process.env.NODE_ENV === 'development') {
      // Create user
      const { data, error: signUpError } = await supabaseAdmin.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        throw signUpError;
      }

      // Directly confirm the email
      if (data.user) {
        const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
          data.user.id,
          { email_confirm: true }
        );

        if (confirmError) {
          console.error('Email confirmation error:', confirmError);
        }
      }

      return data;
    }

    // For production, use standard sign-up
    return supabaseAdmin.auth.signUp({ email, password });
  },

  // Automatically log in for testing/development
  async signInWithAutoConfirm(email: string, password: string) {
    if (process.env.NODE_ENV === 'development') {
      const { data, error } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      return data;
    }

    // For production, use standard sign-in
    return supabaseAdmin.auth.signInWithPassword({ email, password });
  },
};