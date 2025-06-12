
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Camera, Send } from 'lucide-react';
import { WasteFormFields } from './WasteFormFields';
import { SignInPrompt } from './SignInPrompt';

export function WasteReportForm() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    waste_type: '',
    description: '',
    location_name: '',
    latitude: null as number | null,
    longitude: null as number | null,
    image_url: '',
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          toast({
            title: "Location captured!",
            description: "GPS coordinates have been recorded.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Could not get your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "You need to sign in to report waste.",
        variant: "destructive",
      });
      return;
    }

    if (!form.waste_type || !form.location_name || !form.title) {
      toast({
        title: "Missing information",
        description: "Please fill in title, waste type and location.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Submit waste report
      const { error: reportError } = await supabase
        .from('waste_reports')
        .insert({
          user_id: user.id,
          title: form.title,
          waste_type: form.waste_type,
          description: form.description,
          location_name: form.location_name,
          latitude: form.latitude,
          longitude: form.longitude,
          image_url: form.image_url || null,
          status: 'pending',
        });

      if (reportError) throw reportError;

      // Award points to user
      const newPoints = (profile?.points || 0) + 10;
      const { error: pointsError } = await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', user.id);

      if (pointsError) throw pointsError;

      toast({
        title: "Report submitted!",
        description: "Thank you for helping keep our campus clean. You earned 10 points!",
      });

      // Reset form
      setForm({
        title: '',
        waste_type: '',
        description: '',
        location_name: '',
        latitude: null,
        longitude: null,
        image_url: '',
      });

    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <SignInPrompt />;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Report Waste
        </CardTitle>
        <CardDescription>
          Help keep our campus clean and earn 10 points for each report!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <WasteFormFields 
            form={form} 
            setForm={setForm} 
            onGetLocation={getLocation} 
          />

          <Button type="submit" className="w-full" disabled={loading}>
            <Send className="h-4 w-4 mr-2" />
            {loading ? 'Submitting...' : 'Submit Report (+10 points)'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
