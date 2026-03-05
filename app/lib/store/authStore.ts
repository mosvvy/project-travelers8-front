import { create } from 'zustand';
import type { AuthUser } from '../api/types/auth-user';

type User = AuthUser | AuthenticatedUser;

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  user: null,
  setUser: user => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
