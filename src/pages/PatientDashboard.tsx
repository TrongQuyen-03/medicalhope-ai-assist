import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  FileText,
  MessageCircle,
  Clock,
  User,
  Heart,
  Activity,
  Bell,
} from 'lucide-react';

interface PatientAppointment {
  _id: string;
  date: string;
  doctorId: { fullName: string };
  status: string;
  notes?: string;
}

export const PatientDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!token) return;

      try {
        // Fetch patient's appointments
        const response = await fetch('/api/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments || []);
        }
      } catch (error) {
        console.error('Failed to fetch patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [token]);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Chào buổi sáng' : hour < 17 ? 'Chào buổi chiều' : 'Chào buổi tối';
    return `${greeting}, ${user?.fullName}!`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
          Chào mừng bạn đến với hệ thống y tế MedicalHope
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer group">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Đặt lịch hẹn</CardTitle>
                <CardDescription>Đặt lịch hẹn với bác sĩ</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer group">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-smooth">
                <MessageCircle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg">Chat với AI</CardTitle>
                <CardDescription>Tư vấn sức khỏe thông minh</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-hover-medical transition-smooth cursor-pointer group">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg group-hover:bg-success/20 transition-smooth">
                <FileText className="h-6 w-6 text-success" />
              </div>
              <div>
                <CardTitle className="text-lg">Hồ sơ y tế</CardTitle>
                <CardDescription>Xem hồ sơ sức khỏe</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Health Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="h-4 w-4 text-destructive" />
              Sức khỏe tim mạch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Bình thường</div>
            <p className="text-sm text-muted-foreground">Cập nhật lần cuối: Hôm qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Chỉ số BMI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">22.5</div>
            <p className="text-sm text-muted-foreground">Trọng lượng lý tưởng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-warning" />
              Lời nhắc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">3</div>
            <p className="text-sm text-muted-foreground">Cần chú ý</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Lịch hẹn sắp tới
          </CardTitle>
          <CardDescription>
            Danh sách các cuộc hẹn trong thời gian tới
          </CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <div className="space-y-3">
              {appointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex-1">
                    <p className="font-medium">Bác sĩ: {appointment.doctorId.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(appointment.date).toLocaleDateString('vi-VN')} - {new Date(appointment.date).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {appointment.notes && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Ghi chú: {appointment.notes}
                      </p>
                    )}
                  </div>
                  <Badge 
                    variant={appointment.status === 'scheduled' ? 'default' : 'secondary'}
                  >
                    {appointment.status === 'scheduled' && 'Đã lên lịch'}
                    {appointment.status === 'completed' && 'Hoàn thành'}
                    {appointment.status === 'cancelled' && 'Đã hủy'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Chưa có lịch hẹn nào</p>
              <Button className="mt-4">Đặt lịch hẹn ngay</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Lời khuyên sức khỏe hôm nay</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
              <h4 className="font-medium text-primary mb-2">💧 Uống đủ nước</h4>
              <p className="text-sm text-muted-foreground">
                Uống ít nhất 8 ly nước mỗi ngày để duy trì sức khỏe tốt và giúp cơ thể hoạt động hiệu quả.
              </p>
            </div>
            <div className="p-4 bg-success/5 rounded-lg border-l-4 border-success">
              <h4 className="font-medium text-success mb-2">🥗 Ăn uống lành mạnh</h4>
              <p className="text-sm text-muted-foreground">
                Bổ sung nhiều rau xanh và trái cây tươi vào bữa ăn để cung cấp vitamin và khoáng chất cần thiết.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};