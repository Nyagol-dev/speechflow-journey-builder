const API_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth
  signup: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  getMe: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get user');
    return data;
  },

  // AI
  speechToText: async (audioData, language = 'en') => {
    const response = await fetch(`${API_URL}/ai/speech-to-text`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ audioData, language }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Speech to text failed');
    return data;
  },

  textToSpeech: async (text, voice = 'alloy') => {
    const response = await fetch(`${API_URL}/ai/text-to-speech`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ text, voice }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Text to speech failed');
    return data;
  },
};
