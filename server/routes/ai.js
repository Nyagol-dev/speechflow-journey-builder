const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const googleTTS = require('google-tts-api');
const fs = require('fs');

// Helper to validate audio data
const validateAudioData = (audioData) => {
  try {
    const cleanData = audioData.replace(/^data:audio\/[^;]+;base64,/, '');
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanData)) {
      return { isValid: false, error: 'Invalid base64 format' };
    }
    const size = (cleanData.length * 3) / 4 - (cleanData.match(/=/g) || []).length;
    if (size > 25 * 1024 * 1024) {
      return { isValid: false, error: 'File size too large' };
    }
    return { isValid: true, size };
  } catch (error) {
    return { isValid: false, error: 'Failed to validate audio data' };
  }
};

// @desc    Speech to Text (Gemini)
// @route   POST /api/ai/speech-to-text
// @access  Private
router.post('/speech-to-text', protect, async (req, res) => {
  try {
    const { audioData, language = 'en', prompt } = req.body;

    if (!audioData) {
      return res.status(400).json({ success: false, error: 'Audio data is required' });
    }

    const validation = validateAudioData(audioData);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, error: validation.error });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, error: 'Gemini API key not configured' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Convert base64 to format Gemini expects
    const cleanData = audioData.replace(/^data:audio\/[^;]+;base64,/, '');
    
    const result = await model.generateContent([
      prompt || "Transcribe the following audio to text.",
      {
        inlineData: {
          mimeType: "audio/webm", // Assuming webm from frontend
          data: cleanData
        }
      }
    ]);

    const response = await result.response;
    const transcript = response.text();

    res.json({ success: true, transcript });

  } catch (error) {
    console.error('Speech-to-text error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Text to Speech (google-tts-api)
// @route   POST /api/ai/text-to-speech
// @access  Private
router.post('/text-to-speech', protect, async (req, res) => {
  try {
    const { text, voice = 'en' } = req.body; // voice is language code here

    if (!text) {
      return res.status(400).json({ success: false, error: 'Text is required' });
    }

    // google-tts-api returns a URL, but we want base64 to match previous API contract if possible,
    // OR we can just return the URL. The frontend expects base64 audioContent.
    // google-tts-api getAudioBase64 returns a promise with base64 string.
    
    const base64Audio = await googleTTS.getAudioBase64(text, {
      lang: voice,
      slow: false,
      host: 'https://translate.google.com',
    });

    res.json({ success: true, audioContent: base64Audio });

  } catch (error) {
    console.error('Text-to-speech error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
