
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Accessibility, 
  Volume2, 
  Eye, 
  Type, 
  MousePointer2, 
  Contrast,
  Move,
  Settings
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: number;
  reducedMotion: boolean;
  screenReader: boolean;
  voiceCommands: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  colorBlindMode: boolean;
}

const AccessibilityPanel = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 16,
    reducedMotion: false,
    screenReader: false,
    voiceCommands: false,
    keyboardNavigation: true,
    focusIndicators: true,
    colorBlindMode: false,
  });

  const [isListening, setIsListening] = useState(false);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Font size adjustment
    root.style.fontSize = `${settings.fontSize}px`;

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Color blind mode
    if (settings.colorBlindMode) {
      root.classList.add('color-blind-mode');
    } else {
      root.classList.remove('color-blind-mode');
    }

    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }
  }, [settings]);

  // Voice commands simulation
  useEffect(() => {
    if (settings.voiceCommands && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        
        if (command.includes('start lesson')) {
          console.log('Voice command: Starting lesson');
        } else if (command.includes('go to dashboard')) {
          console.log('Voice command: Navigating to dashboard');
        } else if (command.includes('show progress')) {
          console.log('Voice command: Showing progress');
        }
      };

      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => recognition.stop();
    }
  }, [settings.voiceCommands, isListening]);

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const announceForScreenReader = (message: string) => {
    if (settings.screenReader) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-50 bg-primary text-white hover:bg-primary/90 shadow-lg"
          aria-label="Open accessibility settings"
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Settings
          </SheetTitle>
          <SheetDescription>
            Customize your experience with accessibility features
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Visual Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visual Settings
            </h3>
            
            <div className="flex items-center justify-between">
              <label htmlFor="high-contrast" className="text-sm font-medium">
                High Contrast Mode
              </label>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => {
                  updateSetting('highContrast', checked);
                  announceForScreenReader(`High contrast mode ${checked ? 'enabled' : 'disabled'}`);
                }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="font-size" className="text-sm font-medium flex items-center gap-2">
                <Type className="h-4 w-4" />
                Font Size: {settings.fontSize}px
              </label>
              <Slider
                id="font-size"
                min={12}
                max={24}
                step={1}
                value={[settings.fontSize]}
                onValueChange={([value]) => updateSetting('fontSize', value)}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="color-blind" className="text-sm font-medium">
                Color Blind Friendly
              </label>
              <Switch
                id="color-blind"
                checked={settings.colorBlindMode}
                onCheckedChange={(checked) => updateSetting('colorBlindMode', checked)}
              />
            </div>
          </div>

          {/* Motion Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Move className="h-4 w-4" />
              Motion & Animation
            </h3>
            
            <div className="flex items-center justify-between">
              <label htmlFor="reduced-motion" className="text-sm font-medium">
                Reduce Motion
              </label>
              <Switch
                id="reduced-motion"
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="focus-indicators" className="text-sm font-medium">
                Enhanced Focus Indicators
              </label>
              <Switch
                id="focus-indicators"
                checked={settings.focusIndicators}
                onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
              />
            </div>
          </div>

          {/* Audio & Voice Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Audio & Voice
            </h3>
            
            <div className="flex items-center justify-between">
              <label htmlFor="screen-reader" className="text-sm font-medium">
                Screen Reader Support
              </label>
              <Switch
                id="screen-reader"
                checked={settings.screenReader}
                onCheckedChange={(checked) => updateSetting('screenReader', checked)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="voice-commands" className="text-sm font-medium">
                  Voice Commands
                </label>
                <Switch
                  id="voice-commands"
                  checked={settings.voiceCommands}
                  onCheckedChange={(checked) => updateSetting('voiceCommands', checked)}
                />
              </div>
              
              {settings.voiceCommands && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsListening(!isListening)}
                  className={`w-full ${isListening ? 'bg-red-50 border-red-200' : ''}`}
                >
                  {isListening ? 'Stop Listening' : 'Start Voice Commands'}
                </Button>
              )}
            </div>
          </div>

          {/* Navigation Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <MousePointer2 className="h-4 w-4" />
              Navigation
            </h3>
            
            <div className="flex items-center justify-between">
              <label htmlFor="keyboard-nav" className="text-sm font-medium">
                Keyboard Navigation
              </label>
              <Switch
                id="keyboard-nav"
                checked={settings.keyboardNavigation}
                onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSettings({
                  highContrast: false,
                  fontSize: 16,
                  reducedMotion: false,
                  screenReader: false,
                  voiceCommands: false,
                  keyboardNavigation: true,
                  focusIndicators: true,
                  colorBlindMode: false,
                });
                announceForScreenReader('Accessibility settings reset to default');
              }}
            >
              Reset to Default
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccessibilityPanel;
