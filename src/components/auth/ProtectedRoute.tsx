'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/Auth.context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.push('/');
    }
  }, [user, router, requiredRole]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
