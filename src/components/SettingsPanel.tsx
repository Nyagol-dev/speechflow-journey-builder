
import { useState } from 'react';
import { Settings, Bell, Volume2, Eye, Moon, Sun, Globe, Shield, CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    lessonReminders: true,
    progressUpdates: false,
    achievementAlerts: true,
    
    // Audio & Visual
    volume: [75],
    microphoneSensitivity: [60],
    autoplayFeedback: true,
    visualFeedback: true,
    
    // Accessibility
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    
    // Privacy
    dataCollection: true,
    analyticsSharing: false,
    profileVisibility: 'private',
    
    // Language & Region
    language: 'en-US',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    
    // Theme
    darkMode: false,
    theme: 'system'
  });

  const [subscription] = useState({
    plan: 'Pro',
    status: 'Active',
    nextBilling: '2024-07-15',
    features: ['Unlimited Lessons', 'AI Feedback', 'Progress Analytics', 'Custom Goals']
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Here you would typically save to a database or local storage
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>Manage how you receive updates and reminders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-gray-500">Receive notifications on your device</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Lesson Reminders</Label>
              <p className="text-sm text-gray-500">Daily reminders to practice</p>
            </div>
            <Switch
              checked={settings.lessonReminders}
              onCheckedChange={(checked) => handleSettingChange('lessonReminders', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Progress Updates</Label>
              <p className="text-sm text-gray-500">Weekly progress summaries</p>
            </div>
            <Switch
              checked={settings.progressUpdates}
              onCheckedChange={(checked) => handleSettingChange('progressUpdates', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Achievement Alerts</Label>
              <p className="text-sm text-gray-500">Notifications for milestones</p>
            </div>
            <Switch
              checked={settings.achievementAlerts}
              onCheckedChange={(checked) => handleSettingChange('achievementAlerts', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audio & Visual Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="h-5 w-5" />
            <span>Audio & Visual</span>
          </CardTitle>
          <CardDescription>Customize your audio and visual experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Volume Level: {settings.volume[0]}%</Label>
            <Slider
              value={settings.volume}
              onValueChange={(value) => handleSettingChange('volume', value)}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label>Microphone Sensitivity: {settings.microphoneSensitivity[0]}%</Label>
            <Slider
              value={settings.microphoneSensitivity}
              onValueChange={(value) => handleSettingChange('microphoneSensitivity', value)}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Autoplay Feedback</Label>
              <p className="text-sm text-gray-500">Automatically play pronunciation feedback</p>
            </div>
            <Switch
              checked={settings.autoplayFeedback}
              onCheckedChange={(checked) => handleSettingChange('autoplayFeedback', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Visual Feedback</Label>
              <p className="text-sm text-gray-500">Show waveforms and visual cues</p>
            </div>
            <Switch
              checked={settings.visualFeedback}
              onCheckedChange={(checked) => handleSettingChange('visualFeedback', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Accessibility</span>
          </CardTitle>
          <CardDescription>Customize accessibility features for better usability</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>High Contrast Mode</Label>
              <p className="text-sm text-gray-500">Enhanced contrast for better visibility</p>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Large Text</Label>
              <p className="text-sm text-gray-500">Increase font size throughout the app</p>
            </div>
            <Switch
              checked={settings.largeText}
              onCheckedChange={(checked) => handleSettingChange('largeText', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Reduced Motion</Label>
              <p className="text-sm text-gray-500">Minimize animations and transitions</p>
            </div>
            <Switch
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Screen Reader Support</Label>
              <p className="text-sm text-gray-500">Enhanced compatibility with screen readers</p>
            </div>
            <Switch
              checked={settings.screenReader}
              onCheckedChange={(checked) => handleSettingChange('screenReader', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Keyboard Navigation</Label>
              <p className="text-sm text-gray-500">Full keyboard navigation support</p>
            </div>
            <Switch
              checked={settings.keyboardNavigation}
              onCheckedChange={(checked) => handleSettingChange('keyboardNavigation', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Security</span>
          </CardTitle>
          <CardDescription>Control your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Data Collection</Label>
              <p className="text-sm text-gray-500">Allow collection of usage data for improvement</p>
            </div>
            <Switch
              checked={settings.dataCollection}
              onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Analytics Sharing</Label>
              <p className="text-sm text-gray-500">Share anonymous analytics with partners</p>
            </div>
            <Switch
              checked={settings.analyticsSharing}
              onCheckedChange={(checked) => handleSettingChange('analyticsSharing', checked)}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Profile Visibility</Label>
            <select
              className="w-full px-3 py-2 border border-input rounded-md"
              value={settings.profileVisibility}
              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
            >
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
              <option value="public">Public</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Language & Region</span>
          </CardTitle>
          <CardDescription>Customize language and regional preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <select
              className="w-full px-3 py-2 border border-input rounded-md"
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="it-IT">Italian</option>
              <option value="pt-BR">Portuguese</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <select
              className="w-full px-3 py-2 border border-input rounded-md"
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">GMT</option>
              <option value="Europe/Paris">CET</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Date Format</Label>
            <select
              className="w-full px-3 py-2 border border-input rounded-md"
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Subscription</span>
          </CardTitle>
          <CardDescription>Manage your subscription and billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{subscription.plan} Plan</h4>
                <Badge variant={subscription.status === 'Active' ? 'default' : 'secondary'}>
                  {subscription.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">Next billing: {subscription.nextBilling}</p>
            </div>
            <Button variant="outline">Manage Plan</Button>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Included Features:</Label>
            <div className="grid grid-cols-2 gap-2">
              {subscription.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Upgrade Plan</Button>
            <Button variant="outline" className="text-red-600">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Data Management</span>
          </CardTitle>
          <CardDescription>Export or manage your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Progress Data</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Audio Recordings</span>
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <p>You can request a copy of all your data. This may take up to 30 days to process.</p>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="px-8">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
