import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser, User, UserRole } from '../types';
import { currentPatient, currentPsychologist } from '../mocks/data';
import * as authService from '../services/authService';
import { USE_MOCKS } from '../config/runtime';
import {
  mockUserForRole,
  readMockAuthFromPath,
  roleFromPath,
} from '../utils/demoAuth';
import { tokenStorage } from '../services/apiClient';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  login: (role: UserRole) => void;

  signIn: (email: string, password: string) => Promise<UserRole>;
  logout: () => void;
}

function toFrontRole(role: AuthUser['role']): UserRole {
  return role === 'PATIENT' ? 'patient' : 'psychologist';
}

function initialAuthState() {
  const fromPath = readMockAuthFromPath();
  if (fromPath) return fromPath;

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('psiapp-auth');
      if (raw) {
        const parsed = JSON.parse(raw) as {
          state?: { user?: User | null; isAuthenticated?: boolean };
        };
        if (parsed.state?.user) {
          const hasToken = !!tokenStorage.get();
          if (USE_MOCKS || hasToken) {
            return {
              user: parsed.state.user,
              isAuthenticated: !!parsed.state.isAuthenticated,
            };
          }
        }
      }
    } catch {
      // ignore
    }
  }

  if (USE_MOCKS) {
    return { user: currentPatient, isAuthenticated: true };
  }

  return { user: null, isAuthenticated: false };
}

const boot = initialAuthState();

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: boot.user,
      isAuthenticated: boot.isAuthenticated,
      login: (role) =>
        set({
          user: role === 'patient' ? currentPatient : currentPsychologist,
          isAuthenticated: true,
        }),
      signIn: async (email, password) => {
        const res = await authService.login({ email, password });
        const role = toFrontRole(res.user.role);
        set({
          user: {
            id: res.user.id,
            name: res.user.name,
            email: res.user.email,
            role,
          },
          isAuthenticated: true,
        });
        return role;
      },
      logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'psiapp-auth',
      merge: (persisted, current) => {
        const merged = {
          ...current,
          ...(persisted as Partial<AuthState>),
        };
        if (USE_MOCKS) {
          const role = roleFromPath();
          if (role) {
            merged.user = mockUserForRole(role);
            merged.isAuthenticated = true;
          }
        } else if (!tokenStorage.get()) {
          merged.user = null;
          merged.isAuthenticated = false;
        }
        return merged;
      },
    }
  )
);
