
import { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import SpeechAnalytics from '@/components/SpeechAnalytics';
import LessonLibrary from '@/components/LessonLibrary';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
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
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-500">Profile settings will be implemented here.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <AccessibilityPanel />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
