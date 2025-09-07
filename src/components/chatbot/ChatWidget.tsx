import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: Date;
}

interface ChatSession {
  _id: string;
  messages: Message[];
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, token } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createSession = async () => {
    if (!token) return;

    try {
      const response = await fetch('/api/chatbot/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const session: ChatSession = await response.json();
        setSessionId(session._id);
        
        // Add welcome message
        const welcomeMessage: Message = {
          role: 'bot',
          text: `Xin chào ${user?.fullName}! Tôi là AI Assistant của MedicalHope. Tôi có thể giúp bạn:\n\n• Tư vấn sức khỏe cơ bản\n• Đặt lịch hẹn với bác sĩ\n• Giải đáp thắc mắc về dịch vụ y tế\n• Hướng dẫn sử dụng hệ thống\n\nBạn cần tôi hỗ trợ gì?`,
          time: new Date(),
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Failed to create chat session:', error);
    }
  };

  const sendMessage = async (message: string) => {
    if (!token || !sessionId || !message.trim()) return;

    const userMessage: Message = {
      role: 'user',
      text: message,
      time: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send user message to backend
      await fetch(`/api/chatbot/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMessage),
      });

      // Simulate AI response (in real app, this would come from AI service)
      setTimeout(() => {
        const botResponse = generateBotResponse(message);
        const botMessage: Message = {
          role: 'bot',
          text: botResponse,
          time: new Date(),
        };

        setMessages(prev => [...prev, botMessage]);

        // Send bot message to backend
        fetch(`/api/chatbot/sessions/${sessionId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(botMessage),
        });

        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
    }
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('đặt lịch') || lowerMessage.includes('hẹn')) {
      return `Tôi sẽ giúp bạn đặt lịch hẹn. Để đặt lịch hẹn, bạn có thể:\n\n1. Vào mục "Lịch hẹn của tôi" trên thanh menu\n2. Chọn "Tạo lịch hẹn mới"\n3. Chọn bác sĩ và thời gian phù hợp\n\nBạn muốn đặt lịch hẹn với chuyên khoa nào?`;
    }

    if (lowerMessage.includes('đau đầu') || lowerMessage.includes('nhức đầu')) {
      return `Đau đầu có thể do nhiều nguyên nhân khác nhau:\n\n• Căng thẳng, mệt mỏi\n• Thiếu ngủ\n• Thay đổi thời tiết\n• Vấn đề về mắt\n\n⚠️ Lưu ý: Nếu đau đầu kéo dài, tái đi tái lại hoặc có các triệu chứng nghiêm trọng khác, bạn nên đặt lịch hẹn với bác sĩ để được khám và tư vấn cụ thể.`;
    }

    if (lowerMessage.includes('sốt') || lowerMessage.includes('phát sốt')) {
      return `Khi bị sốt, bạn cần:\n\n• Nghỉ ngơi đầy đủ\n• Uống nhiều nước\n• Dùng khăn ấm lau người\n• Theo dõi nhiệt độ thường xuyên\n\n🚨 Cần đến viện ngay nếu:\n• Sốt trên 39°C\n• Sốt kéo dài > 3 ngày\n• Có triệu chứng khó thở, co giật\n\nBạn có muốn tôi hỗ trợ đặt lịch hẹn khẩn cấp không?`;
    }

    if (lowerMessage.includes('hồ sơ') || lowerMessage.includes('bệnh án')) {
      return `Để quản lý hồ sơ y tế điện tử:\n\n1. Vào mục "Hồ sơ y tế" trên menu\n2. Xem lịch sử khám bệnh\n3. Tải lên kết quả xét nghiệm mới\n4. Theo dõi đơn thuốc\n\nTất cả thông tin được bảo mật tuyệt đối theo quy định. Bạn cần hỗ trợ gì thêm về hồ sơ y tế?`;
    }

    // Default response
    return `Tôi hiểu bạn đang hỏi về "${userMessage}". \n\nĐể được tư vấn chính xác nhất, tôi khuyên bạn nên:\n\n• Đặt lịch hẹn với bác sĩ chuyên khoa\n• Mô tả chi tiết triệu chứng khi khám\n• Mang theo kết quả xét nghiệm (nếu có)\n\nBạn có muốn tôi hỗ trợ đặt lịch hẹn ngay không?`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!sessionId) {
      createSession();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-primary shadow-medical hover:shadow-hover-medical z-50"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-medical z-50 flex flex-col">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            ✕
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%]`}>
                  {message.role === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.time.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={isLoading || !inputMessage.trim()}
              className="bg-primary hover:bg-primary-hover"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};