import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Users,
  FileText,
  Clock,
  Stethoscope,
  Activity,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

interface DoctorStats {
  todayAppointments: number;
  totalPatients: number;
  completedVisits: number;
  upcomingAppointments: Array<{
    _id: string;
    date: string;
    patientId: { fullName: string; phone: string };
    status: string;
  }>;
}

export const DoctorDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<DoctorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorStats = async () => {
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
        console.error('Failed to fetch doctor stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorStats();
  }, [token]);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Chào buổi sáng' : hour < 17 ? 'Chào buổi chiều' : 'Chào buổi tối';
    return `${greeting}, Bác sĩ ${user?.fullName}!`;
  };

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

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2">{getWelcomeMessage()}</h1>
        <p className="text-primary-foreground/80">
          Hôm nay: {new Date().toLocaleDateString('vi-VN')} | Phòng khám MedicalHope
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-hover-medical transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hẹn hôm nay</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.todayAppointments || 0}</div>
              <p className="text-xs text-muted-foreground">Cần được xử lý</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hover-medical transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng bệnh nhân</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.totalPatients || 0}</div>
              <p className="text-xs text-muted-foreground">Đang theo dõi</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hover-medical transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lượt khám</CardTitle>
              <Stethoscope className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.completedVisits || 0}</div>
              <p className="text-xs text-muted-foreground">Đã hoàn thành</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hover-medical transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hiệu suất</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">95%</div>
              <p className="text-xs text-muted-foreground">Đánh giá tích cực</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer group">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Khám bệnh</CardTitle>
                <CardDescription>Tạo phiên khám mới</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer group">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg group-hover:bg-success/20 transition-smooth">
                <Calendar className="h-6 w-6 text-success" />
              </div>
              <div>
                <CardTitle className="text-lg">Quản lý lịch</CardTitle>
                <CardDescription>Xem lịch hẹn hôm nay</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer group">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-smooth">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg">Hồ sơ bệnh án</CardTitle>
                <CardDescription>Cập nhật hồ sơ y tế</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Lịch trình hôm nay
            </CardTitle>
            <CardDescription>
              Danh sách bệnh nhân cần khám hôm nay
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.upcomingAppointments && stats.upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {stats.upcomingAppointments.slice(0, 5).map((appointment) => (
                  <div
                    key={appointment._id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-smooth"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{appointment.patientId.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        SĐT: {appointment.patientId.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(appointment.date).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <Badge 
                      variant={appointment.status === 'scheduled' ? 'default' : 'secondary'}
                    >
                      {appointment.status === 'scheduled' && 'Chờ khám'}
                      {appointment.status === 'completed' && 'Hoàn thành'}
                      {appointment.status === 'cancelled' && 'Đã hủy'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Không có lịch hẹn hôm nay</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical Notes & Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Ghi chú y khoa
            </CardTitle>
            <CardDescription>
              Lời nhắc và ghi chú quan trọng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-warning/5 rounded-lg border-l-4 border-warning">
                <h4 className="font-medium text-warning mb-2">⚠️ Nhắc nhở</h4>
                <p className="text-sm text-muted-foreground">
                  Cập nhật hồ sơ bệnh án cho 3 bệnh nhân từ tuần trước
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                <h4 className="font-medium text-primary mb-2">📋 Nhiệm vụ</h4>
                <p className="text-sm text-muted-foreground">
                  Cần xem xét kết quả xét nghiệm của bệnh nhân Nguyễn Văn A
                </p>
              </div>
              <div className="p-4 bg-success/5 rounded-lg border-l-4 border-success">
                <h4 className="font-medium text-success mb-2">✅ Hoàn thành</h4>
                <p className="text-sm text-muted-foreground">
                  Đã cập nhật đơn thuốc cho 5 bệnh nhân hôm qua
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Thống kê hiệu suất
          </CardTitle>
          <CardDescription>
            Báo cáo hoạt động trong tháng này
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">127</div>
              <p className="text-sm text-muted-foreground">Bệnh nhân đã khám</p>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <div className="text-2xl font-bold text-success mb-1">95%</div>
              <p className="text-sm text-muted-foreground">Độ hài lòng</p>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <div className="text-2xl font-bold text-accent mb-1">8.2h</div>
              <p className="text-sm text-muted-foreground">Thời gian khám TB</p>
            </div>
            <div className="text-center p-4 bg-warning/5 rounded-lg">
              <div className="text-2xl font-bold text-warning mb-1">2</div>
              <p className="text-sm text-muted-foreground">Lịch hẹn bị hủy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};