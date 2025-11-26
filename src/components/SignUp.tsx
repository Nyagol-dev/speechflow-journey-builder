import React, { useState } from 'react';
import { useAuthContext } from '@/context/AuthProvider';

import { Button } from '@/components/ui/button';

interface SignUpProps {
  onSignUp: () => void;
  onBack?: () => void;
}

const SignUp = ({ onSignUp, onBack }: SignUpProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuthContext();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await signUp(email, password);
      setSuccess(true);
      onSignUp();
    } catch (error: any) {
      setError(error.message || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSignUp}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-xs italic mb-4">
              Success! Please check your email for a confirmation link.
            </p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-4">
            <Button className="w-full" type="submit">
              Create Account
            </Button>
            {onBack && (
              <Button 
                variant="outline" 
                className="w-full"
                type="button"
                onClick={onBack}
              >
                Back to Welcome
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
