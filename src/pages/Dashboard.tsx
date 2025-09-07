import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Calendar,
  FileText,
  Stethoscope,
  Clock,
  TrendingUp,
} from 'lucide-react';

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  todayAppointments: number;
  totalVisits: number;
  upcomingAppointments: Array<{
    _id: string;
    date: string;
    patientId: { fullName: string; phone: string };
    doctorId: { fullName: string };
    status: string;
  }>;
}

export const Dashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!token) return;

      try {
        const response = await fetch('/api/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [token]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Chào buổi sáng' : hour < 17 ? 'Chào buổi chiều' : 'Chào buổi tối';
    return `${greeting}, ${user?.fullName}!`;
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'doctor': return 'Bác sĩ';
      case 'patient': return 'Bệnh nhân';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2">{getWelcomeMessage()}</h1>
        <p className="text-primary-foreground/80">
          Vai trò: {getRoleName(user?.role || '')} | Hôm nay: {new Date().toLocaleDateString('vi-VN')}
        </p>
      </div>

      {/* Stats Cards */}
      {user?.role === 'admin' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Tổng bệnh nhân"
            value={stats.totalPatients}
            description="Đã đăng ký trong hệ thống"
            icon={Users}
          />
          <DashboardCard
            title="Tổng bác sĩ"
            value={stats.totalDoctors}
            description="Đang hoạt động"
            icon={Stethoscope}
          />
          <DashboardCard
            title="Lịch hẹn hôm nay"
            value={stats.todayAppointments}
            description="Cần được xử lý"
            icon={Calendar}
          />
          <DashboardCard
            title="Tổng lượt khám"
            value={stats.totalVisits}
            description="Đã thực hiện"
            icon={FileText}
          />
        </div>
      )}

      {/* Upcoming Appointments */}
      {stats?.upcomingAppointments && stats.upcomingAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Lịch hẹn sắp tới
            </CardTitle>
            <CardDescription>
              {stats.upcomingAppointments.length} lịch hẹn trong thời gian tới
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.upcomingAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex-1">
                    <p className="font-medium">{appointment.patientId.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      Bác sĩ: {appointment.doctorId.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      SĐT: {appointment.patientId.phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(appointment.date).toLocaleDateString('vi-VN')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(appointment.date).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <Badge 
                      variant={appointment.status === 'scheduled' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {appointment.status === 'scheduled' && 'Đã lên lịch'}
                      {appointment.status === 'completed' && 'Hoàn thành'}
                      {appointment.status === 'cancelled' && 'Đã hủy'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user?.role === 'admin' && (
          <>
            <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Thêm bệnh nhân mới</CardTitle>
                <CardDescription>
                  Đăng ký thông tin bệnh nhân mới vào hệ thống
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Tạo lịch hẹn</CardTitle>
                <CardDescription>
                  Đặt lịch hẹn cho bệnh nhân với bác sĩ
                </CardDescription>
              </CardHeader>
            </Card>
          </>
        )}
        
        {user?.role === 'doctor' && (
          <>
            <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Khám bệnh</CardTitle>
                <CardDescription>
                  Tạo phiên khám mới cho bệnh nhân
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Xem lịch hẹn</CardTitle>
                <CardDescription>
                  Quản lý lịch hẹn trong ngày
                </CardDescription>
              </CardHeader>
            </Card>
          </>
        )}
        
        {user?.role === 'patient' && (
          <>
            <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Đặt lịch hẹn</CardTitle>
                <CardDescription>
                  Đặt lịch hẹn với bác sĩ yêu thích
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Chat với AI</CardTitle>
                <CardDescription>
                  Tư vấn sức khỏe với chatbot thông minh
                </CardDescription>
              </CardHeader>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};