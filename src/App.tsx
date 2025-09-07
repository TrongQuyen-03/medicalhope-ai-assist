import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "@/pages/Dashboard";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="patients" element={<Dashboard />} />
              <Route path="doctors" element={<Dashboard />} />
              <Route path="appointments" element={<Dashboard />} />
              <Route path="my-appointments" element={<Dashboard />} />
              <Route path="my-patients" element={<Dashboard />} />
              <Route path="visits" element={<Dashboard />} />
              <Route path="records" element={<Dashboard />} />
              <Route path="my-records" element={<Dashboard />} />
              <Route path="chatbot" element={<Dashboard />} />
              <Route path="notifications" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
