
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

interface OptionalAuthRouteProps {
  children: React.ReactNode;
}

export function OptionalAuthRoute({ children }: OptionalAuthRouteProps) {
  const { loading } = useAuth();
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setHasTimedOut(true);
    }, 3000); // 3 second timeout

    return () => clearTimeout(timeout);
  }, []);

  // If loading has timed out, render children anyway
  if (loading && !hasTimedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Always render children - no authentication required
  return <>{children}</>;
}
