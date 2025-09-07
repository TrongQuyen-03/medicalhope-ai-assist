import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import AuthPage from '@/pages/AuthPage';

export const MainLayout: React.FC = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-primary-foreground rounded-full"></div>
          </div>
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  // Auto-redirect to appropriate dashboard based on user role
  if (location.pathname === '/') {
    if (user.role === 'patient') {
      return <Navigate to="/patient-dashboard" replace />;
    } else if (user.role === 'doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};