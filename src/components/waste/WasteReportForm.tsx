
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { MapPin, Camera, Send, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function WasteReportForm() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
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

  const wasteTypes = [
    'plastic',
    'paper',
    'glass',
    'metal',
    'organic',
    'electronic',
    'other'
  ];

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
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Sign In Required</CardTitle>
          <CardDescription>
            You need to sign in to report waste and earn points.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={() => navigate('/auth')} className="bg-green-600 hover:bg-green-700">
            <LogIn className="h-4 w-4 mr-2" />
            Sign In to Continue
          </Button>
        </CardContent>
      </Card>
    );
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
          <div className="space-y-2">
            <Label htmlFor="title">Report Title *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Plastic bottles near library"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waste-type">Waste Type *</Label>
            <Select value={form.waste_type} onValueChange={(value) => setForm(prev => ({ ...prev, waste_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the waste situation..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                value={form.location_name}
                onChange={(e) => setForm(prev => ({ ...prev, location_name: e.target.value }))}
                placeholder="e.g., Library parking lot, Building A entrance"
                required
              />
              <Button type="button" onClick={getLocation} variant="outline">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
            {form.latitude && form.longitude && (
              <p className="text-sm text-green-600">
                GPS coordinates captured: {form.latitude.toFixed(6)}, {form.longitude.toFixed(6)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL (Optional)</Label>
            <Input
              id="image"
              value={form.image_url}
              onChange={(e) => setForm(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://example.com/photo.jpg"
              type="url"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            <Send className="h-4 w-4 mr-2" />
            {loading ? 'Submitting...' : 'Submit Report (+10 points)'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
