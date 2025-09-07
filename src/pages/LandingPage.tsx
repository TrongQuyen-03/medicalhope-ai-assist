import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Stethoscope, 
  Heart, 
  Users, 
  Clock,
  Shield,
  Award,
  MessageCircle,
  Calendar,
  FileText,
  Phone,
  Mail,
  MapPin,
  CheckCircle
} from 'lucide-react';
import heroImage from '@/assets/hero-medical.jpg';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Chăm sóc sức khỏe{' '}
                  <span className="text-primary">thông minh</span>{' '}
                  với MedicalHope
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Hệ thống y tế hiện đại với công nghệ AI tiên tiến, mang đến trải nghiệm chăm sóc sức khỏe tối ưu cho bạn và gia đình.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth?mode=register">
                  <Button size="lg" className="hover-scale w-full sm:w-auto">
                    Đăng ký ngay
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" size="lg" className="hover-scale w-full sm:w-auto">
                    Đăng nhập
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Miễn phí đăng ký</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Tư vấn AI 24/7</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Medical Care" 
                className="rounded-2xl shadow-hover-medical w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Khám phá các tính năng hiện đại giúp bạn quản lý sức khỏe hiệu quả
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-hover-medical transition-smooth group">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-smooth">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Chatbot AI thông minh</CardTitle>
                <CardDescription>
                  Tư vấn sức khỏe 24/7 với công nghệ AI tiên tiến, hỗ trợ đặt lịch và giải đáp thắc mắc
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-hover-medical transition-smooth group">
              <CardHeader>
                <div className="p-3 bg-success/10 rounded-lg w-fit group-hover:bg-success/20 transition-smooth">
                  <Calendar className="h-8 w-8 text-success" />
                </div>
                <CardTitle>Đặt lịch hẹn dễ dàng</CardTitle>
                <CardDescription>
                  Đặt lịch khám với bác sĩ chỉ trong vài cú click, quản lý lịch hẹn thông minh
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-hover-medical transition-smooth group">
              <CardHeader>
                <div className="p-3 bg-accent/10 rounded-lg w-fit group-hover:bg-accent/20 transition-smooth">
                  <FileText className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Hồ sơ y tế điện tử</CardTitle>
                <CardDescription>
                  Lưu trữ và quản lý hồ sơ sức khỏe số hóa, an toàn và tiện lợi
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Về MedicalHope
                </h2>
                <p className="text-lg text-muted-foreground">
                  MedicalHope là hệ thống quản lý y tế hiện đại, kết hợp công nghệ AI tiên tiến với dịch vụ chăm sóc sức khỏe chuyên nghiệp. Chúng tôi cam kết mang đến trải nghiệm y tế tốt nhất cho mọi bệnh nhân.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                  <p className="text-sm text-muted-foreground">Bệnh nhân tin tưởng</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">50+</div>
                  <p className="text-sm text-muted-foreground">Bác sĩ chuyên khoa</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                  <p className="text-sm text-muted-foreground">Hỗ trợ không ngừng</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-2">99%</div>
                  <p className="text-sm text-muted-foreground">Độ hài lòng</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="hover:shadow-hover-medical transition-smooth">
                <CardHeader className="pb-4">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">An toàn tuyệt đối</CardTitle>
                  <CardDescription className="text-sm">
                    Bảo mật thông tin y tế theo tiêu chuẩn quốc tế
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-hover-medical transition-smooth">
                <CardHeader className="pb-4">
                  <Award className="h-8 w-8 text-success mb-2" />
                  <CardTitle className="text-lg">Chất lượng cao</CardTitle>
                  <CardDescription className="text-sm">
                    Đội ngũ bác sĩ giàu kinh nghiệm, chuyên nghiệp
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-hover-medical transition-smooth">
                <CardHeader className="pb-4">
                  <Clock className="h-8 w-8 text-accent mb-2" />
                  <CardTitle className="text-lg">Tiết kiệm thời gian</CardTitle>
                  <CardDescription className="text-sm">
                    Quy trình khám chữa bệnh nhanh chóng, hiệu quả
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-hover-medical transition-smooth">
                <CardHeader className="pb-4">
                  <Heart className="h-8 w-8 text-destructive mb-2" />
                  <CardTitle className="text-lg">Chăm sóc tận tâm</CardTitle>
                  <CardDescription className="text-sm">
                    Đặt sức khỏe bệnh nhân lên hàng đầu
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cung cấp đầy đủ các dịch vụ y tế chất lượng cao với công nghệ hiện đại
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-hover-medical transition-smooth">
              <CardHeader>
                <Stethoscope className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Khám tổng quát</CardTitle>
                <CardDescription>
                  Khám sức khỏe tổng quát định kỳ với trang thiết bị hiện đại và bác sĩ giàu kinh nghiệm
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-hover-medical transition-smooth">
              <CardHeader>
                <Heart className="h-12 w-12 text-destructive mb-4" />
                <CardTitle>Khám chuyên khoa</CardTitle>
                <CardDescription>
                  Các chuyên khoa: Tim mạch, Tiêu hóa, Thần kinh, Nội tiết, Da liễu và nhiều hơn nữa
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover:shadow-hover-medical transition-smooth">
              <CardHeader>
                <Users className="h-12 w-12 text-success mb-4" />
                <CardTitle>Tư vấn từ xa</CardTitle>
                <CardDescription>
                  Tư vấn sức khỏe trực tuyến với bác sĩ và chatbot AI thông minh, tiện lợi mọi lúc mọi nơi
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ để được tư vấn tốt nhất
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-hover-medical transition-smooth">
                  <CardHeader className="text-center">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">Hotline</CardTitle>
                    <CardDescription>(028) 1900 1234</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:shadow-hover-medical transition-smooth">
                  <CardHeader className="text-center">
                    <Mail className="h-8 w-8 text-success mx-auto mb-2" />
                    <CardTitle className="text-lg">Email</CardTitle>
                    <CardDescription>info@medicalhope.vn</CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <Card className="hover:shadow-hover-medical transition-smooth">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-8 w-8 text-accent mt-1" />
                    <div>
                      <CardTitle className="text-lg mb-2">Địa chỉ</CardTitle>
                      <CardDescription>
                        123 Đường Sức Khỏe, Phường Y Tế<br />
                        Quận Chăm Sóc, TP. Hồ Chí Minh
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
            <div className="bg-muted/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Bắt đầu hành trình sức khỏe
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground text-center">
                  Đăng ký ngay để trải nghiệm hệ thống y tế thông minh với AI
                </p>
                <div className="flex flex-col space-y-3">
                  <Link to="/auth?mode=register" className="w-full">
                    <Button size="lg" className="w-full hover-scale">
                      Đăng ký miễn phí
                    </Button>
                  </Link>
                  <Link to="/auth" className="w-full">
                    <Button variant="outline" size="lg" className="w-full hover-scale">
                      Đã có tài khoản? Đăng nhập
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};