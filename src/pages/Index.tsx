
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import SpeechAnalytics from '@/components/SpeechAnalytics';
import LessonLibrary from '@/components/LessonLibrary';
import ProfileSettings from '@/components/ProfileSettings';
import SettingsPanel from '@/components/SettingsPanel';
import { useAuthContext } from '@/context/AuthProvider';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const renderContent = () => {
    if (!user) return null;

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
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        session={user ? { user } : null}
      />
      <AccessibilityPanel />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
