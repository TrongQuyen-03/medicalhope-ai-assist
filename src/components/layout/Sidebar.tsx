import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  Calendar,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Stethoscope,
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/medical-hope-logo.png';

const navigation = {
  admin: [
    { name: 'Dashboard', href: '/app/dashboard', icon: BarChart3 },
    { name: 'Quản lý bệnh nhân', href: '/app/patients', icon: Users },
    { name: 'Quản lý bác sĩ', href: '/app/doctors', icon: Stethoscope },
    { name: 'Lịch hẹn', href: '/app/appointments', icon: Calendar },
    { name: 'Hồ sơ y tế', href: '/app/records', icon: FileText },
    { name: 'Thông báo', href: '/app/notifications', icon: Bell },
    { name: 'Cài đặt', href: '/app/settings', icon: Settings },
  ],
  doctor: [
    { name: 'Dashboard', href: '/app/doctor-dashboard', icon: BarChart3 },
    { name: 'Bệnh nhân của tôi', href: '/app/my-patients', icon: Users },
    { name: 'Lịch hẹn', href: '/app/appointments', icon: Calendar },
    { name: 'Khám bệnh', href: '/app/visits', icon: ClipboardList },
    { name: 'Hồ sơ y tế', href: '/app/records', icon: FileText },
    { name: 'Thông báo', href: '/app/notifications', icon: Bell },
  ],
  patient: [
    { name: 'Dashboard', href: '/app/patient-dashboard', icon: BarChart3 },
    { name: 'Lịch hẹn của tôi', href: '/app/my-appointments', icon: Calendar },
    { name: 'Hồ sơ y tế', href: '/app/my-records', icon: FileText },
    { name: 'Chatbot AI', href: '/app/chatbot', icon: MessageSquare },
    { name: 'Thông báo', href: '/app/notifications', icon: Bell },
  ],
};

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const userNavigation = navigation[user.role] || [];

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-4">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="MedicalHope" className="w-8 h-8" />
          <span className="text-xl font-bold text-sidebar-foreground">MedicalHope</span>
        </div>
      </div>

      {/* User Info */}
      <div className="border-b border-sidebar-border p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-sidebar-primary flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-primary-foreground">
              {user.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user.fullName}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {user.role === 'admin' && 'Quản trị viên'}
              {user.role === 'doctor' && 'Bác sĩ'}
              {user.role === 'patient' && 'Bệnh nhân'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {userNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-smooth',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0 transition-smooth',
                  isActive ? 'text-sidebar-accent-foreground' : 'text-sidebar-foreground/60'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-4">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};