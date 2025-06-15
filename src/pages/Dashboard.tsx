
import { useAuth } from '@/hooks/useAuth';
import { UserProfile } from '@/components/auth/UserProfile';
import { WasteReportsList } from '@/components/waste/WasteReportsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Recycle, MapPin, Gift, BookOpen, TrendingUp, LogIn, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashboard() {
  const { profile, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('Auth state:', { user: !!user, profile: !!profile, loading });
  }, [user, profile, loading]);

  const quickActions = [
    {
      title: 'Report Waste',
      description: 'Upload a photo and location of waste',
      icon: Recycle,
      color: 'bg-green-500',
      action: () => navigate('/report-waste'),
    },
    {
      title: 'Find Bins',
      description: 'Locate nearby recycling bins',
      icon: MapPin,
      color: 'bg-blue-500',
      action: () => navigate('/bin-locator'),
    },
    {
      title: 'Rewards',
      description: 'Redeem your points for rewards',
      icon: Gift,
      color: 'bg-purple-500',
      action: () => navigate('/rewards'),
    },
    {
      title: 'Learn',
      description: 'Recycling guides and tips',
      icon: BookOpen,
      color: 'bg-orange-500',
      action: () => navigate('/education'),
    },
    {
      title: 'Blog',
      description: 'Read waste management articles',
      icon: FileText,
      color: 'bg-indigo-500',
      action: () => navigate('/blog'),
    },
  ];

  // Don't render anything while loading to prevent flashing
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Sign In Button */}
        <div className="flex justify-between items-center">
          <div></div>
          {!user && (
            <Button 
              onClick={() => navigate('/auth')} 
              className="bg-green-600 hover:bg-green-700 shadow-lg"
              size="lg"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In / Sign Up
            </Button>
          )}
        </div>

        {/* Welcome Section */}
        <div className="text-center">
          {user && profile ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {profile.full_name || 'User'}! 🌱
              </h1>
              <p className="text-gray-600">
                Ready to make our campus greener today?
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to EcoTrack! 🌱
              </h1>
              <p className="text-gray-600">
                Making our campus greener together
              </p>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">
                  Browse content freely or sign in to track your impact and earn rewards
                </p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card - only show if logged in */}
          {user && profile && (
            <div className="lg:col-span-1">
              <UserProfile />
            </div>
          )}

          {/* Quick Actions */}
          <div className={(user && profile) ? "lg:col-span-2" : "lg:col-span-3"}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  {(user && profile) ? "What would you like to do today?" : "Explore what you can do with EcoTrack"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-shadow"
                      onClick={action.action}
                    >
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{action.title}</div>
                        <div className="text-sm text-gray-600">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats and Recent Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Reports */}
          <WasteReportsList />

          {/* Stats Cards */}
          <div className="space-y-6">
            {(user && profile) ? (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Points:</span>
                      <span className="font-semibold text-green-600">{profile?.points || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Reports Made:</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Waste Collected:</span>
                      <span className="font-semibold">0 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">CO₂ Saved:</span>
                      <span className="font-semibold">0 kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Join EcoTrack</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Sign up to track your environmental impact, earn points, and make a difference!
                  </p>
                  <Button onClick={() => navigate('/auth')} className="w-full bg-green-600 hover:bg-green-700">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Campus Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Users:</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Reports:</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Recycled Today:</span>
                    <span className="font-semibold">0 kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
