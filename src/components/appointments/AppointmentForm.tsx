import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Stethoscope, Users, FileText } from 'lucide-react';

interface Doctor {
  _id: string;
  fullName: string;
  username: string;
}

interface Patient {
  _id: string;
  fullName: string;
  phone: string;
}

interface AppointmentFormData {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  notes: string;
}

interface AppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    notes: '',
  });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  
  const { token, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        // Fetch doctors
        const doctorsResponse = await fetch('/api/auth/users?role=doctor', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        
        // Fetch patients
        const patientsResponse = await fetch('/api/patients', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (doctorsResponse.ok && patientsResponse.ok) {
          const doctorsData = await doctorsResponse.json();
          const patientsData = await patientsResponse.json();
          
          setDoctors(doctorsData.users || []);
          setPatients(patientsData.patients || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientId || !formData.doctorId) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng chọn bệnh nhân và bác sĩ.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const appointmentDateTime = new Date(`${formData.date}T${formData.time}`);
      
      const submitData = {
        patientId: formData.patientId,
        doctorId: formData.doctorId,
        date: appointmentDateTime.toISOString(),
        notes: formData.notes,
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast({
          title: "Thành công",
          description: "Tạo lịch hẹn mới thành công!",
        });
        onSuccess?.();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Tạo lịch hẹn thất bại');
      }
    } catch (error) {
      toast({
        title: "Lỗi tạo lịch hẹn",
        description: error instanceof Error ? error.message : "Vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loadingData) {
    return (
      <Card className="w-full max-w-2xl shadow-medical">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Đang tải dữ liệu...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-2xl shadow-medical">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl">Tạo Lịch Hẹn Mới</CardTitle>
            <CardDescription>
              Đặt lịch hẹn cho bệnh nhân với bác sĩ
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Bệnh nhân</Label>
              <Select value={formData.patientId} onValueChange={(value) => handleInputChange('patientId', value)}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Chọn bệnh nhân" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient._id} value={patient._id}>
                      <div className="flex flex-col">
                        <span>{patient.fullName}</span>
                        <span className="text-xs text-muted-foreground">{patient.phone}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctorId">Bác sĩ</Label>
              <Select value={formData.doctorId} onValueChange={(value) => handleInputChange('doctorId', value)}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Stethoscope className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Chọn bác sĩ" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor._id} value={doctor._id}>
                      <div className="flex flex-col">
                        <span>BS. {doctor.fullName}</span>
                        <span className="text-xs text-muted-foreground">@{doctor.username}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Ngày hẹn</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={today}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Giờ hẹn</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Ghi chú về lịch hẹn, triệu chứng, hoặc yêu cầu đặc biệt..."
                className="pl-10"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-secondary hover:bg-secondary-hover transition-smooth" 
              disabled={isLoading}
            >
              {isLoading ? "Đang tạo..." : "Tạo Lịch Hẹn"}
            </Button>
            
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1"
              >
                Hủy
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};