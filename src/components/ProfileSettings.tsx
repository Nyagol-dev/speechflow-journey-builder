
import { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    location: 'San Francisco, CA',
    bio: 'Passionate about improving my speech and communication skills.',
    emergencyContact: 'John Doe - +1 (555) 987-6543'
  });

  const [speechGoals, setSpeechGoals] = useState({
    primaryGoal: 'Accent Reduction',
    targetAccent: 'American English',
    sessionsPerWeek: 5,
    minutesPerSession: 20,
    focusAreas: ['Pronunciation', 'Fluency', 'Confidence']
  });

  const handleSave = () => {
    // Here you would typically save to a database
    console.log('Saving profile data:', profileData);
    console.log('Saving speech goals:', speechGoals);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalChange = (field: string, value: any) => {
    setSpeechGoals(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-gray-600">Speech Therapy Student</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">Level 3</Badge>
                  <Badge variant="outline" className="bg-success-50 text-success-700">7 Day Streak</Badge>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
          <CardDescription>Manage your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="w-full px-3 py-2 border border-input rounded-md resize-none"
              rows={3}
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={profileData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Speech Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Speech Therapy Goals</CardTitle>
          <CardDescription>Set and track your speech improvement objectives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryGoal">Primary Goal</Label>
              <select
                id="primaryGoal"
                className="w-full px-3 py-2 border border-input rounded-md"
                value={speechGoals.primaryGoal}
                onChange={(e) => handleGoalChange('primaryGoal', e.target.value)}
                disabled={!isEditing}
              >
                <option value="Accent Reduction">Accent Reduction</option>
                <option value="Fluency Improvement">Fluency Improvement</option>
                <option value="Pronunciation">Pronunciation</option>
                <option value="Confidence Building">Confidence Building</option>
                <option value="Voice Training">Voice Training</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetAccent">Target Accent</Label>
              <select
                id="targetAccent"
                className="w-full px-3 py-2 border border-input rounded-md"
                value={speechGoals.targetAccent}
                onChange={(e) => handleGoalChange('targetAccent', e.target.value)}
                disabled={!isEditing}
              >
                <option value="American English">American English</option>
                <option value="British English">British English</option>
                <option value="Australian English">Australian English</option>
                <option value="Canadian English">Canadian English</option>
                <option value="Neutral English">Neutral English</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionsPerWeek">Sessions per Week</Label>
              <Input
                id="sessionsPerWeek"
                type="number"
                min="1"
                max="7"
                value={speechGoals.sessionsPerWeek}
                onChange={(e) => handleGoalChange('sessionsPerWeek', parseInt(e.target.value))}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minutesPerSession">Minutes per Session</Label>
              <Input
                id="minutesPerSession"
                type="number"
                min="5"
                max="60"
                value={speechGoals.minutesPerSession}
                onChange={(e) => handleGoalChange('minutesPerSession', parseInt(e.target.value))}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Focus Areas</Label>
            <div className="flex flex-wrap gap-2">
              {['Pronunciation', 'Fluency', 'Confidence', 'Articulation', 'Intonation', 'Rhythm'].map((area) => (
                <Badge
                  key={area}
                  variant={speechGoals.focusAreas.includes(area) ? "default" : "outline"}
                  className={`cursor-pointer ${!isEditing && 'pointer-events-none'}`}
                  onClick={() => {
                    if (isEditing) {
                      const newAreas = speechGoals.focusAreas.includes(area)
                        ? speechGoals.focusAreas.filter(a => a !== area)
                        : [...speechGoals.focusAreas, area];
                      handleGoalChange('focusAreas', newAreas);
                    }
                  }}
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Account Management</CardTitle>
          <CardDescription>Manage your account settings and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Download Data
            </Button>
            <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50">
              Reset Progress
            </Button>
            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
