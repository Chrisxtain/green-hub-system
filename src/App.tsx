
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import ReportWaste from "./pages/ReportWaste";
import Rewards from "./pages/Rewards";
import BinLocator from "./pages/BinLocator";
import EducationHub from "./pages/EducationHub";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create QueryClient inside the component to ensure React is fully initialized
  const queryClient = React.useMemo(() => new QueryClient(), []);

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
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/report-waste" 
                element={
                  <ProtectedRoute>
                    <ReportWaste />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/rewards" 
                element={
                  <ProtectedRoute>
                    <Rewards />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bin-locator" 
                element={
                  <ProtectedRoute>
                    <BinLocator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/education" 
                element={
                  <ProtectedRoute>
                    <EducationHub />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
