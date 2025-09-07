import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import medicalHopeLogo from '@/assets/medical-hope-logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={medicalHopeLogo} alt="MedicalHope" className="h-8 w-8" />
              <span className="text-lg font-bold text-primary">MedicalHope</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Trung tâm y tế MedicalHope - Nơi mang đến hy vọng và sức khỏe tốt nhất cho bạn và gia đình.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Liên kết nhanh</h3>
            <div className="space-y-2">
              <a href="#home" className="block text-sm text-muted-foreground hover:text-primary transition-smooth story-link">
                Trang chủ
              </a>
              <a href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-smooth story-link">
                Giới thiệu
              </a>
              <a href="#services" className="block text-sm text-muted-foreground hover:text-primary transition-smooth story-link">
                Dịch vụ
              </a>
              <a href="#contact" className="block text-sm text-muted-foreground hover:text-primary transition-smooth story-link">
                Liên hệ
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Dịch vụ</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Khám tổng quát</p>
              <p className="text-sm text-muted-foreground">Khám chuyên khoa</p>
              <p className="text-sm text-muted-foreground">Xét nghiệm</p>
              <p className="text-sm text-muted-foreground">Chụp chiếu</p>
              <p className="text-sm text-muted-foreground">Tư vấn AI</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  123 Đường Sức Khỏe, Phường Y Tế, Quận Chăm Sóc, TP. Hồ Chí Minh
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">(028) 1900 1234</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">info@medicalhope.vn</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>Thứ 2 - Thứ 6: 7:00 - 19:00</p>
                  <p>Thứ 7 - CN: 8:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 MedicalHope. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Được tạo với</span>
              <Heart className="h-4 w-4 text-destructive" />
              <span>bởi đội ngũ MedicalHope</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};