
import { useAuth } from '@/hooks/useAuth';

interface OptionalAuthRouteProps {
  children: React.ReactNode;
}

export function OptionalAuthRoute({ children }: OptionalAuthRouteProps) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Always render children - no authentication required
  return <>{children}</>;
}
