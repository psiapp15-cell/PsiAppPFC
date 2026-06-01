import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { USE_MOCKS } from '../config/runtime';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
  role: 'patient' | 'psychologist';
  children: ReactNode;
}

export function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    if (USE_MOCKS) return null;
    const home =
      user.role === 'patient' ? '/patient/dashboard' : '/psychologist/dashboard';
    return <Navigate to={home} replace />;
  }

  return <>{children}</>;
}
