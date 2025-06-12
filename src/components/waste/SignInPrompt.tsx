
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SignInPrompt() {
  const navigate = useNavigate();

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
