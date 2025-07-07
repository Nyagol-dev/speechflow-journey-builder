
import { useState } from 'react';
import { Mic, MicOff, Volume2, Copy, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useToast } from '@/hooks/use-toast';

const AudioRecorder = () => {
  const [editableText, setEditableText] = useState('');
  const { toast } = useToast();
  
  const {
    isRecording,
    transcript,
    isProcessing,
    error: speechError,
    startRecording,
    stopRecording,
    clearTranscript,
  } = useSpeechRecognition();

  const {
    speak,
    isGenerating,
    isPlaying,
    error: ttsError,
    clearError,
  } = useTextToSpeech();

  const handleStartRecording = async () => {
    clearError();
    await startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleSpeak = async () => {
    const textToSpeak = editableText || transcript;
    if (textToSpeak.trim()) {
      await speak(textToSpeak);
    } else {
      toast({
        title: "No text to speak",
        description: "Please record some audio or enter text first.",
        variant: "destructive",
      });
    }
  };

  const handleCopyText = () => {
    const textToCopy = editableText || transcript;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Text copied",
        description: "Text has been copied to clipboard.",
      });
    }
  };

  const handleClear = () => {
    clearTranscript();
    setEditableText('');
    clearError();
  };

  // Simulated waveform bars for visual feedback
  const waveformBars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Recording Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Speech Recognition & Synthesis</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Waveform Visualization */}
          <div className="flex items-center justify-center space-x-1 h-16">
            {waveformBars.map((bar) => (
              <div
                key={bar}
                className={`w-1 bg-primary rounded-full transition-all duration-150 ${
                  isRecording 
                    ? 'animate-pulse' 
                    : 'h-2'
                }`}
                style={{
                  height: isRecording ? `${Math.random() * 40 + 8}px` : '8px',
                  animationDelay: `${bar * 0.1}s`
                }}
              />
            ))}
          </div>

          {/* Recording Button */}
          <div className="relative">
            <Button
              size="lg"
              className={`w-20 h-20 rounded-full ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : isRecording ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
            
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping"></div>
            )}
          </div>

          {/* Status Messages */}
          {isRecording && (
            <p className="text-sm text-red-600 font-medium animate-pulse">
              Recording... Click to stop
            </p>
          )}
          
          {isProcessing && (
            <p className="text-sm text-blue-600 font-medium">
              Processing audio...
            </p>
          )}

          {(speechError || ttsError) && (
            <p className="text-sm text-red-600">
              Error: {speechError || ttsError}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Transcript Card */}
      {(transcript || editableText) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Transcript
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyText}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSpeak}
                  disabled={isGenerating || isPlaying}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={editableText || transcript}
              onChange={(e) => setEditableText(e.target.value)}
              placeholder="Your speech will appear here... You can also type or edit the text."
              className="min-h-32 resize-none"
            />
            
            {isPlaying && (
              <p className="text-sm text-blue-600 font-medium mt-2">
                Playing audio...
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AudioRecorder;
