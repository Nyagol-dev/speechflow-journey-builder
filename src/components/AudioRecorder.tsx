
import { useState } from 'react';
import { Mic, MicOff, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecording(true);
    } else {
      setIsRecording(true);
      setHasRecording(false);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Simulated waveform bars
  const waveformBars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 text-center">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Practice Speaking
          </h3>
          <p className="text-sm text-gray-600">
            Tap the microphone to start recording your speech
          </p>
        </div>

        {/* Waveform Visualization */}
        <div className="flex items-center justify-center space-x-1 h-16 mb-6">
          {waveformBars.map((bar) => (
            <div
              key={bar}
              className={`w-1 bg-primary rounded-full transition-all duration-150 ${
                isRecording 
                  ? 'animate-wave' 
                  : hasRecording 
                    ? 'h-4' 
                    : 'h-2'
              }`}
              style={{
                height: isRecording ? `${Math.random() * 40 + 8}px` : undefined,
                animationDelay: `${bar * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Recording Button */}
        <div className="relative mb-6">
          <Button
            size="lg"
            className={`w-16 h-16 rounded-full ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-primary hover:bg-primary-600'
            }`}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <Square className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
          
          {isRecording && (
            <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-pulse-ring"></div>
          )}
        </div>

        {/* Playback Controls */}
        {hasRecording && (
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <Square className="h-4 w-4 mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isPlaying ? 'Stop' : 'Play'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setHasRecording(false);
                setIsPlaying(false);
              }}
            >
              <MicOff className="h-4 w-4 mr-2" />
              Re-record
            </Button>
          </div>
        )}

        {isRecording && (
          <p className="text-sm text-red-600 font-medium animate-pulse">
            Recording in progress...
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioRecorder;
