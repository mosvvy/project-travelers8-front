import { create } from 'zustand';
import type { AuthUser } from '../api/clientApi';
import { getMe } from '../api/clientApi';

type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  restore: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  user: null,

  setUser: user => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),

  restore: async () => {
    try {
      const me = await getMe();

      set({
        user: { _id: me._id, name: me.name, email: me.email, avatarUrl: me.avatarUrl },
        isAuthenticated: true,
      });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
