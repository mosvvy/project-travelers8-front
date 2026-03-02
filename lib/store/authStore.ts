import { create } from 'zustand';
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

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