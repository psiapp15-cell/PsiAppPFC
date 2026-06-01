import { USE_MOCKS } from '../config/runtime';
import type { User, UserRole } from '../types';
import { currentPatient, currentPsychologist } from '../mocks/data';

export function roleFromPath(pathname = window.location.pathname): UserRole | null {
  if (pathname.startsWith('/psychologist')) return 'psychologist';
  if (pathname.startsWith('/patient')) return 'patient';
  return null;
}

export function mockUserForRole(role: UserRole): User {
  return role === 'psychologist' ? currentPsychologist : currentPatient;
}

/** Sessão mock alinhada à URL antes do React renderizar (Builder.io import). */
export function readMockAuthFromPath() {
  if (!USE_MOCKS || typeof window === 'undefined') return null;
  const role = roleFromPath();
  if (!role) return null;
  return {
    user: mockUserForRole(role),
    isAuthenticated: true as const,
  };
}

export function syncMockAuthToPath() {
  const auth = readMockAuthFromPath();
  if (!auth) return;
  try {
    localStorage.setItem(
      'psiapp-auth',
      JSON.stringify({ state: auth, version: 0 })
    );
  } catch {
    // ignore
  }
}
