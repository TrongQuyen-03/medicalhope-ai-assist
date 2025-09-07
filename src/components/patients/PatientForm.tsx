import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Calendar, MapPin, Phone, User } from 'lucide-react';

interface PatientFormData {
  fullName: string;
  dob: string;
  gender: 'male' | 'female' | 'other' | '';
  phone: string;
  address: string;
  allergies: string;
}

interface PatientFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<PatientFormData>({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    allergies: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { token } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gender) {
      toast({
        title: "Lỗi giới tính",
        description: "Vui lòng chọn giới tính.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        allergies: formData.allergies.split(',').map(a => a.trim()).filter(a => a),
      };

      const response = await fetch('/api/patients', {
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
          description: "Thêm bệnh nhân mới thành công!",
        });
        onSuccess?.();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Thêm bệnh nhân thất bại');
      }
    } catch (error) {
      toast({
        title: "Lỗi thêm bệnh nhân",
        description: error instanceof Error ? error.message : "Vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof PatientFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl shadow-medical">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-xl">Thêm Bệnh Nhân Mới</CardTitle>
            <CardDescription>
              Nhập thông tin chi tiết của bệnh nhân
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="pl-10"
                  placeholder="Nhập họ và tên đầy đủ"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Ngày sinh</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Giới tính</Label>
              <Select value={formData.gender} onValueChange={(value: 'male' | 'female' | 'other') => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  placeholder="0xxxxxxxxx"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="pl-10"
                placeholder="Nhập địa chỉ đầy đủ"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Dị ứng (tùy chọn)</Label>
            <Textarea
              id="allergies"
              value={formData.allergies}
              onChange={(e) => handleInputChange('allergies', e.target.value)}
              placeholder="Nhập các loại dị ứng (phân cách bằng dấu phẩy), ví dụ: Penicillin, Tôm cua, Phấn hoa"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Các loại dị ứng phân cách bằng dấu phẩy
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-primary hover:bg-primary-hover transition-smooth" 
              disabled={isLoading}
            >
              {isLoading ? "Đang thêm..." : "Thêm Bệnh Nhân"}
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