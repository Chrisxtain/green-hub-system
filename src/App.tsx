
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { OptionalAuthRoute } from "@/components/auth/OptionalAuthRoute";
import { AuthForm } from "@/components/auth/AuthForm";
import Dashboard from "./pages/Dashboard";
import ReportWaste from "./pages/ReportWaste";
import Rewards from "./pages/Rewards";
import BinLocator from "./pages/BinLocator";
import EducationHub from "./pages/EducationHub";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <OptionalAuthRoute>
                    <Dashboard />
                  </OptionalAuthRoute>
                } 
              />
              <Route 
                path="/auth" 
                element={<AuthForm />} 
              />
              <Route 
                path="/report-waste" 
                element={
                  <OptionalAuthRoute>
                    <ReportWaste />
                  </OptionalAuthRoute>
                } 
              />
              <Route 
                path="/rewards" 
                element={
                  <OptionalAuthRoute>
                    <Rewards />
                  </OptionalAuthRoute>
                } 
              />
              <Route 
                path="/bin-locator" 
                element={
                  <OptionalAuthRoute>
                    <BinLocator />
                  </OptionalAuthRoute>
                } 
              />
              <Route 
                path="/education" 
                element={
                  <OptionalAuthRoute>
                    <EducationHub />
                  </OptionalAuthRoute>
                } 
              />
              <Route 
                path="/blog" 
                element={
                  <OptionalAuthRoute>
                    <Blog />
                  </OptionalAuthRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
