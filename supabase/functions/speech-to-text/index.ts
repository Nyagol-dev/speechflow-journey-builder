import { serve } from "https://deno.land/std@0.170.0/http/server.ts";

// Using Deno's native FormData implementation
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audioData } = await req.json();
    
    if (!audioData) {
      throw new Error('Audio data is required');
    }

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Convert base64 to binary audio data
    const bytes = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));

    // Create form data for OpenAI Whisper API using Deno's native FormData
    const formData = new FormData();
    formData.append('file', new File([bytes], 'audio.webm', { type: 'audio/webm' }));
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI Whisper API error:', error);
      throw new Error(`Speech recognition failed: ${error.error?.message || 'Unknown error'}`);
    }

    const result = await response.json();
    const transcript = result.text || '';

    return new Response(
      JSON.stringify({ 
        transcript, 
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Speech-to-text error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        success: false 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});