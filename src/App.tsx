import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';
import WelcomePage from '@/pages/WelcomePage';
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { AuthProvider, useAuthContext } from '@/context/AuthProvider';

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading, checkUser } = useAuthContext();

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/home" /> : <WelcomePage />} 
      />
      <Route 
        path="/home" 
        element={user ? <Index /> : <Navigate to="/" />} 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};


export default App;
