import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LogIn from '@/components/LogIn';
import SignUp from '@/components/SignUp';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Database } from '@/types/supabase';

const improvementOptions = [
  { id: 'pronunciation', label: 'Pronunciation' },
  { id: 'fluency', label: 'Fluency' },
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'accent', label: 'Accent Reduction' },
  { id: 'public_speaking', label: 'Public Speaking' },
];

const WelcomePage = () => {
  const [view, setView] = useState<'welcome' | 'login' | 'signup' | 'onboarding'>('welcome');
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleImprovement = (id: string) => {
    setSelectedImprovements(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleCompleteOnboarding = async () => {
    try {
      // First, try to get the current session
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        // If no user session, try to get the session from the current session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Save preferences with the session user
          await saveUserPreferences(session.user.id);
        } else {
          console.error('No user session found');
          // Redirect to login if no session is found
          navigate('/');
        }
      } else {
        // User is logged in, save preferences
        await saveUserPreferences(user.id);
      }
    } catch (error) {
      console.error('Error during onboarding:', error);
      // Handle error appropriately
    }
  };

  const saveUserPreferences = async (userId: string) => {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        improvement_areas: selectedImprovements,
        onboarded: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error saving preferences:', error);
    } else {
      // Navigate to home after successful save
      navigate('/home');
    }
  };

  if (view === 'login') {
    return <LogIn onLogin={() => navigate('/home')} onBack={() => setView('welcome')} />;
  }

  if (view === 'signup') {
    return <SignUp onSignUp={() => setView('onboarding')} onBack={() => setView('welcome')} />;
  }

  if (view === 'onboarding') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">What would you like to improve?</CardTitle>
            <CardDescription className="text-center">
              Select one or more areas to personalize your experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {improvementOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedImprovements.includes(option.id) ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => toggleImprovement(option.id)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setView('welcome')}>
              Back
            </Button>
            <Button 
              onClick={handleCompleteOnboarding}
              disabled={selectedImprovements.length === 0}
            >
              Complete Setup
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to SpeechFlow
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enhance your speech and communication skills with our personalized learning platform
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            className="w-full"
            size="lg"
            onClick={() => setView('login')}
          >
            Log In
          </Button>
          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={() => setView('signup')}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
