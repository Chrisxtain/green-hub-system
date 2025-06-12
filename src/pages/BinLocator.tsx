
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Search, Recycle } from 'lucide-react';

export default function BinLocator() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for recycling bin locations
  const binLocations = [
    {
      id: 1,
      name: 'Main Library Entrance',
      type: 'Mixed Recycling',
      description: 'Paper, plastic, glass, and metal',
      distance: '0.2 miles',
      building: 'Library',
      floor: 'Ground Floor',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      lastEmptied: '2 hours ago',
    },
    {
      id: 2,
      name: 'Student Union Food Court',
      type: 'Composting',
      description: 'Food waste and compostable materials',
      distance: '0.3 miles',
      building: 'Student Union',
      floor: '2nd Floor',
      coordinates: { lat: 40.7130, lng: -74.0058 },
      lastEmptied: '4 hours ago',
    },
    {
      id: 3,
      name: 'Engineering Building Lobby',
      type: 'E-Waste',
      description: 'Electronics, batteries, and tech waste',
      distance: '0.5 miles',
      building: 'Engineering Hall',
      floor: '1st Floor',
      coordinates: { lat: 40.7125, lng: -74.0065 },
      lastEmptied: '1 day ago',
    },
    {
      id: 4,
      name: 'Dormitory Common Area',
      type: 'Mixed Recycling',
      description: 'Paper, plastic, glass, and metal',
      distance: '0.4 miles',
      building: 'Residential Hall A',
      floor: 'Ground Floor',
      coordinates: { lat: 40.7132, lng: -74.0055 },
      lastEmptied: '6 hours ago',
    },
    {
      id: 5,
      name: 'Science Lab Building',
      type: 'Hazardous Waste',
      description: 'Chemical containers and lab waste',
      distance: '0.7 miles',
      building: 'Science Center',
      floor: 'Basement',
      coordinates: { lat: 40.7120, lng: -74.0070 },
      lastEmptied: '3 hours ago',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Mixed Recycling': return 'bg-green-100 text-green-800';
      case 'Composting': return 'bg-orange-100 text-orange-800';
      case 'E-Waste': return 'bg-blue-100 text-blue-800';
      case 'Hazardous Waste': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Mixed Recycling': return '♻️';
      case 'Composting': return '🍃';
      case 'E-Waste': return '📱';
      case 'Hazardous Waste': return '⚠️';
      default: return '🗑️';
    }
  };

  const filteredLocations = binLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGetDirections = (location: typeof binLocations[0]) => {
    // In a real app, this would open maps with directions
    alert(`Getting directions to ${location.name}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bin Locator 🗺️
          </h1>
          <p className="text-gray-600">
            Find the nearest recycling bins on campus
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Search by location, building, or waste type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline">
                <Navigation className="h-4 w-4 mr-2" />
                Use My Location
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bin Types Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Recycling Bin Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from(new Set(binLocations.map(b => b.type))).map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeIcon(type)}</span>
                  <Badge className={getTypeColor(type)}>{type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Locations List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLocations.map((location) => (
            <Card key={location.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      {location.name}
                    </CardTitle>
                    <CardDescription>
                      {location.building} • {location.floor}
                    </CardDescription>
                  </div>
                  <Badge className={getTypeColor(location.type)}>
                    {getTypeIcon(location.type)} {location.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{location.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Distance: {location.distance}</span>
                  <span className="text-gray-500">Last emptied: {location.lastEmptied}</span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleGetDirections(location)}
                    className="flex-1"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline">
                    <Recycle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No recycling bins found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
