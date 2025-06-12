
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Camera, MapPin, Upload } from 'lucide-react';

const wasteTypes = [
  { value: 'plastic', label: 'Plastic' },
  { value: 'paper', label: 'Paper' },
  { value: 'glass', label: 'Glass' },
  { value: 'metal', label: 'Metal' },
  { value: 'organic', label: 'Organic' },
  { value: 'electronic', label: 'Electronic' },
  { value: 'other', label: 'Other' }
];

export function WasteReportForm() {
  const { user, profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    waste_type: '',
    location_name: '',
    image_url: ''
  });

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location captured",
            description: "Your current location has been recorded",
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
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by this browser",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    if (!formData.title || !formData.waste_type) {
      toast({
        title: "Missing information",
        description: "Please fill in the title and waste type",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waste_reports')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          waste_type: formData.waste_type,
          location_name: formData.location_name,
          latitude: location?.lat || null,
          longitude: location?.lng || null,
          image_url: formData.image_url
        });

      if (error) throw error;

      toast({
        title: "Report submitted!",
        description: "Thank you for helping keep our campus clean. You've earned 10 points!",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        waste_type: '',
        location_name: '',
        image_url: ''
      });
      setLocation(null);

    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Report Waste
        </CardTitle>
        <CardDescription>
          Help keep our campus clean by reporting waste you find. Earn points for each report!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Brief description of the waste"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waste_type">Waste Type *</Label>
            <Select value={formData.waste_type} onValueChange={(value) => setFormData(prev => ({ ...prev, waste_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Additional details about the waste..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location_name">Location</Label>
            <div className="flex gap-2">
              <Input
                id="location_name"
                value={formData.location_name}
                onChange={(e) => setFormData(prev => ({ ...prev, location_name: e.target.value }))}
                placeholder="e.g., Library entrance, Cafeteria parking lot"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={handleGetLocation}>
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
            {location && (
              <p className="text-sm text-green-600">
                ✓ GPS coordinates captured ({location.lat.toFixed(6)}, {location.lng.toFixed(6)})
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Photo URL (Optional)</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://example.com/photo.jpg"
            />
            <p className="text-sm text-gray-500">
              For now, upload your photo to an image hosting service and paste the URL here.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Submitting Report...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2" />
                Submit Report (+10 points)
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
