import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Member } from '../types';
import { getMe, logout as logoutApi } from '../api/auth';

interface AuthState {
  member: Member | null;
  loading: boolean;
  setMember: (member: Member | null) => void;
  refreshMember: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      member: null,
      loading: true,
      setMember: (member) => set({ member, loading: false }),
      refreshMember: async () => {
        set({ loading: true });
        try {
          const memberData = await getMe();
          set({ member: memberData, loading: false });
        } catch {
          set({ member: null, loading: false });
        }
      },
      logout: async () => {
        try {
          await logoutApi();
        } finally {
          set({ member: null });
          localStorage.removeItem('auth-storage'); // 추가적인 명시적 정리
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ member: state.member }),
    }
  )
);
