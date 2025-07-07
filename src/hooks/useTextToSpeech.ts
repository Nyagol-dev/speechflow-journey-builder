import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useTextToSpeech = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const speak = useCallback(async (text: string, voice = 'en-US-Standard-A') => {
    if (!text.trim()) {
      setError('No text to speak');
      return;
    }

    try {
      setError(null);
      setIsGenerating(true);
      
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text: text.trim(),
          voice: voice || 'alloy'
        }
      });

      if (error) throw error;
      
      if (data.success) {
        // Convert base64 to audio blob
        const audioBytes = Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0));
        const audioBlob = new Blob([audioBytes], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Play the audio
        const audio = new Audio(audioUrl);
        setIsPlaying(true);
        
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        audio.onerror = () => {
          setIsPlaying(false);
          setError('Failed to play audio');
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
      } else {
        throw new Error(data.error || 'Text-to-speech failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate speech');
      console.error('Text-to-speech error:', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    speak,
    isGenerating,
    isPlaying,
    error,
    clearError,
  };
};