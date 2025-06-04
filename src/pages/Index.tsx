
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
