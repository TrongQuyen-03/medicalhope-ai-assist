import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import heroImage from '@/assets/hero-medical.jpg';
import logo from '@/assets/medical-hope-logo.png';

export const AuthPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');

  // Update mode when URL params change
  useEffect(() => {
    setIsLogin(searchParams.get('mode') !== 'register');
  }, [searchParams]);

  if (user) {
    // Redirect authenticated users based on role
    if (user.role === 'patient') {
      return <Navigate to="/app/patient-dashboard" replace />;
    } else if (user.role === 'doctor') {
      return <Navigate to="/app/doctor-dashboard" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/app/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-primary/20"></div>
        <img 
          src={heroImage} 
          alt="Medical Center" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-8 shadow-medical">
            <img src={logo} alt="MedicalHope" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-primary mb-4">MedicalHope</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Hệ thống quản lý bệnh nhân hiện đại
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>✓ Quản lý hồ sơ bệnh nhân</p>
              <p>✓ Đặt lịch hẹn trực tuyến</p>
              <p>✓ Hồ sơ y tế điện tử</p>
              <p>✓ Chatbot AI hỗ trợ 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img src={logo} alt="MedicalHope" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-primary">MedicalHope</h1>
            <p className="text-muted-foreground">Hệ thống quản lý y tế</p>
          </div>

          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;