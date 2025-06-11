
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut, Award, Calendar } from 'lucide-react';

export function UserProfile() {
  const { user, profile, signOut } = useAuth();

  if (!user || !profile) return null;

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'staff': return 'secondary';
      case 'recycler': return 'outline';
      default: return 'default';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
          <User className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-xl">{profile.full_name || 'User'}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Role:</span>
          <Badge variant={getRoleBadgeVariant(profile.role)}>
            {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
          </Badge>
        </div>
        
        {profile.student_id && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Student ID:</span>
            <span className="text-sm text-muted-foreground">{profile.student_id}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium flex items-center gap-1">
            <Award className="h-4 w-4" />
            Points:
          </span>
          <span className="text-lg font-bold text-green-600">{profile.points}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Member since:
          </span>
          <span className="text-sm text-muted-foreground">
            {new Date(profile.created_at).toLocaleDateString()}
          </span>
        </div>
        
        <Button 
          onClick={signOut} 
          variant="outline" 
          className="w-full mt-6"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
