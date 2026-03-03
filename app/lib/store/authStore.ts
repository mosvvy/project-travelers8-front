import { create } from 'zustand';
import type { AuthUser } from '../api/types/auth-user';

type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  user: null,
  setUser: user => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
