// @deno-types="https://deno.land/x/types@0.1.2/types.d.ts"
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Supported audio formats
const SUPPORTED_FORMATS = [
  'audio/webm',
  'audio/mp4',
  'audio/mpeg',
  'audio/wav',
  'audio/ogg',
  'audio/flac',
  'audio/m4a'
];

// Maximum file size (25MB - OpenAI's limit)
const MAX_FILE_SIZE = 25 * 1024 * 1024;

interface TranscriptionRequest {
  audioData: string;
  language?: string;
  format?: string;
  temperature?: number;
  prompt?: string;
}

interface TranscriptionResponse {
  transcript?: string;
  success: boolean;
  error?: string;
  processingTime?: number;
}

// Utility function to detect audio format from base64 data
function detectAudioFormat(base64Data: string): string {
  // Remove data URL prefix if present
  const cleanData = base64Data.replace(/^data:audio\/[^;]+;base64,/, '');
  
  try {
    // Decode first few bytes to check magic numbers
    const bytes = Uint8Array.from(atob(cleanData.substring(0, 100)), c => c.charCodeAt(0));
    
    // Check for common audio file signatures
    if (bytes[0] === 0x1A && bytes[1] === 0x45 && bytes[2] === 0xDF && bytes[3] === 0xA3) {
      return 'audio/webm';
    }
    if (bytes[0] === 0xFF && (bytes[1] & 0xE0) === 0xE0) {
      return 'audio/mpeg';
    }
    if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
      return 'audio/wav';
    }
    if (bytes[0] === 0x4F && bytes[1] === 0x67 && bytes[2] === 0x67 && bytes[3] === 0x53) {
      return 'audio/ogg';
    }
    if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) {
      return 'audio/mp4';
    }
    
    // Default fallback
    return 'audio/webm';
  } catch {
    return 'audio/webm';
  }
}

// Utility function to validate base64 audio data
function validateAudioData(audioData: string): { isValid: boolean; error?: string; size?: number } {
  try {
    // Remove data URL prefix if present
    const cleanData = audioData.replace(/^data:audio\/[^;]+;base64,/, '');
    
    // Check if it's valid base64
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanData)) {
      return { isValid: false, error: 'Invalid base64 format' };
    }
    
    // Calculate file size
    const size = (cleanData.length * 3) / 4 - (cleanData.match(/=/g) || []).length;
    
    if (size > MAX_FILE_SIZE) {
      return { 
        isValid: false, 
        error: `File size too large: ${(size / (1024 * 1024)).toFixed(2)}MB. Maximum allowed: 25MB` 
      };
    }
    
    if (size < 100) {
      return { isValid: false, error: 'Audio file too small' };
    }
    
    return { isValid: true, size };
  } catch (error) {
    return { isValid: false, error: 'Failed to validate audio data' };
  }
}

serve(async (req) => {
  const startTime = Date.now();
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    });
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ 
        error: 'Method not allowed. Use POST.', 
        success: false 
      }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    // Parse request body
    let requestData: TranscriptionRequest;
    try {
      requestData = await req.json();
    } catch {
      throw new Error('Invalid JSON in request body');
    }

    const { 
      audioData, 
      language = 'en', 
      format,
      temperature = 0,
      prompt 
    } = requestData;
    
    // Validate required fields
    if (!audioData) {
      throw new Error('Audio data is required');
    }

    if (typeof audioData !== 'string') {
      throw new Error('Audio data must be a base64 string');
    }

    // Validate audio data
    const validation = validateAudioData(audioData);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid audio data');
    }

    // Check for API key
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Detect or use provided audio format
    const audioFormat = format || detectAudioFormat(audioData);
    
    // Validate audio format
    if (!SUPPORTED_FORMATS.includes(audioFormat)) {
      throw new Error(`Unsupported audio format: ${audioFormat}`);
    }

    // Convert base64 to binary audio data
    const cleanData = audioData.replace(/^data:audio\/[^;]+;base64,/, '');
    const bytes = Uint8Array.from(atob(cleanData), c => c.charCodeAt(0));

    // Create form data for OpenAI Whisper API
    const formData = new FormData();
    const fileExtension = audioFormat.split('/')[1];
    formData.append('file', new File([bytes], `audio.${fileExtension}`, { type: audioFormat }));
    formData.append('model', 'whisper-1');
    formData.append('language', language);
    formData.append('temperature', temperature.toString());
    
    if (prompt) {
      formData.append('prompt', prompt);
    }

    // Make request to OpenAI Whisper API
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'Unknown error';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      
      console.error('OpenAI Whisper API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage
      });
      
      throw new Error(`Speech recognition failed: ${errorMessage}`);
    }

    const result = await response.json();
    const transcript = result.text || '';
    const processingTime = Date.now() - startTime;

    // Log successful transcription
    console.log('Transcription successful:', {
      textLength: transcript.length,
      processingTime,
      language,
      audioFormat,
      fileSize: validation.size
    });

    const successResponse: TranscriptionResponse = { 
      transcript, 
      success: true,
      processingTime
    };

    return new Response(
      JSON.stringify(successResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('Speech-to-text error:', {
      error: error.message,
      processingTime,
      timestamp: new Date().toISOString()
    });

    const errorResponse: TranscriptionResponse = { 
      error: error.message, 
      success: false,
      processingTime
    };

    return new Response(
      JSON.stringify(errorResponse),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});