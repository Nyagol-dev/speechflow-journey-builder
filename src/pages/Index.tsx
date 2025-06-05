
import { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import SpeechAnalytics from '@/components/SpeechAnalytics';
import LessonLibrary from '@/components/LessonLibrary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AccessibilityPanel />
      
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="lessons" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Lesson Library</h1>
              <p className="text-gray-600 mb-6">Choose from our comprehensive collection of speech therapy exercises</p>
              <LessonLibrary />
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Speech Analytics</h1>
              <p className="text-gray-600 mb-6">Track your detailed progress and improvement metrics</p>
              <SpeechAnalytics />
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Overview</h1>
              <p className="text-gray-600 mb-6">View your learning journey and achievements</p>
              <SpeechAnalytics />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
