import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthProvider';

interface LogInProps {
  onLogin: () => void;
  onBack?: () => void;
}

const LogIn = ({ onLogin, onBack }: LogInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signIn } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signIn(email, password);
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
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
          <div className="flex flex-col space-y-4">
            <Button className="w-full" type="submit">
              Sign In
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
            <div className="text-center">
              <a
                className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 hover:underline cursor-pointer"
                onClick={() => {/* TODO: Implement forgot password */}}
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
