
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface WasteReport {
  id: string;
  title: string;
  description: string | null;
  waste_type: string;
  location_name: string | null;
  status: string;
  points_awarded: number | null;
  created_at: string;
  user_id: string;
}

export function WasteReportsList() {
  const { data: reports, isLoading } = useQuery({
    queryKey: ['waste-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('waste_reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as WasteReport[];
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'in_progress': return 'default';
      case 'resolved': return 'default';
      default: return 'secondary';
    }
  };

  const getWasteTypeEmoji = (type: string) => {
    switch (type) {
      case 'plastic': return '🥤';
      case 'paper': return '📄';
      case 'glass': return '🍾';
      case 'metal': return '🥫';
      case 'organic': return '🍌';
      case 'electronic': return '📱';
      default: return '🗑️';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-20 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
        <CardDescription>Latest waste reports from the community</CardDescription>
      </CardHeader>
      <CardContent>
        {reports && reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getWasteTypeEmoji(report.waste_type)}</span>
                    <div>
                      <h4 className="font-semibold">{report.title}</h4>
                      <p className="text-sm text-gray-600 capitalize">{report.waste_type}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(report.status)}>
                    {report.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                {report.description && (
                  <p className="text-sm text-gray-600">{report.description}</p>
                )}
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {report.location_name && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{report.location_name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}</span>
                  </div>
                  {report.points_awarded && (
                    <div className="flex items-center gap-1">
                      <span className="text-green-600">+{report.points_awarded} pts</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            No waste reports yet. Be the first to report!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
