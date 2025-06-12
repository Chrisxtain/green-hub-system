
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface WasteFormData {
  title: string;
  waste_type: string;
  description: string;
  location_name: string;
  latitude: number | null;
  longitude: number | null;
  image_url: string;
}

interface WasteFormFieldsProps {
  form: WasteFormData;
  setForm: React.Dispatch<React.SetStateAction<WasteFormData>>;
  onGetLocation: () => void;
}

const wasteTypes = [
  'plastic',
  'paper',
  'glass',
  'metal',
  'organic',
  'electronic',
  'other'
];

export function WasteFormFields({ form, setForm, onGetLocation }: WasteFormFieldsProps) {
  return (
    <div className="space-y-6">
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
          <Button type="button" onClick={onGetLocation} variant="outline">
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
    </div>
  );
}
