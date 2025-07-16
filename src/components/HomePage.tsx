import React from 'react';

const HomePage = ({ onLogin, onSignUp }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to SpeechFlow</h1>
      <p className="text-lg mb-8">Please log in to continue or sign up to create an account.</p>
      <div className="flex space-x-4">
        <button
          onClick={onLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Log In
        </button>
        <button
          onClick={onSignUp}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HomePage;
