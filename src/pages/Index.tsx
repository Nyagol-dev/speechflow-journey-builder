
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import SpeechAnalytics from '@/components/SpeechAnalytics';
import LessonLibrary from '@/components/LessonLibrary';
import ProfileSettings from '@/components/ProfileSettings';
import SettingsPanel from '@/components/SettingsPanel';
import HomePage from '@/components/HomePage';
import LogIn from '@/components/LogIn';
import SignUp from '@/components/SignUp';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [session, setSession] = useState<Session | null>(null);
  const [view, setView] = useState('home'); // 'home', 'login', 'signup'

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const renderContent = () => {
    if (!session) {
      if (view === 'login') {
        return <LogIn onLogin={() => setView('home')} />;
      }
      if (view === 'signup') {
        return <SignUp onSignUp={() => setView('home')} />;
      }
      return <HomePage onLogin={() => setView('login')} onSignUp={() => setView('signup')} />;
    }

    switch (activeSection) {
      case 'lessons':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lesson Library</h1>
            <p className="text-gray-600 mb-6">Choose from our comprehensive collection of speech therapy exercises</p>
            <LessonLibrary />
          </div>
        );
      case 'progress':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Overview</h1>
            <p className="text-gray-600 mb-6">View your learning journey and achievements</p>
            <SpeechAnalytics />
          </div>
        );
      case 'profile':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600 mb-6">Manage your account and preferences</p>
            <ProfileSettings />
          </div>
        );
      case 'settings':
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600 mb-6">Customize your SpeechFlow experience</p>
            <SettingsPanel />
          </div>
        );
      default:
        return <Dashboard user={session.user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {<Header activeSection={activeSection} onSectionChange={setActiveSection} session={session} />}
      <AccessibilityPanel />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
