import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from './useAuthStore';
import * as authApi from '../api/auth';

// Mock the API module
vi.mock('../api/auth', () => ({
    getMe: vi.fn(),
    logout: vi.fn(),
}));

describe('useAuthStore', () => {
    beforeEach(() => {
        // Reset the store state manually before each test if needed
        // Zustand persist might keep state between tests, so we clear it
        useAuthStore.setState({ member: null, loading: false });
        vi.clearAllMocks();
    });

    it('should have initial null member', () => {
        const state = useAuthStore.getState();
        expect(state.member).toBeNull();
    });

    it('refreshMember should update member on success', async () => {
        const mockMember = { id: 'user-1', nickname: 'tester', role: 'REGULAR' };
        vi.mocked(authApi.getMe).mockResolvedValue(mockMember as any);

        await useAuthStore.getState().refreshMember();

        expect(useAuthStore.getState().member).toEqual(mockMember);
        expect(useAuthStore.getState().loading).toBe(false);
    });

    it('refreshMember should set member to null on failure', async () => {
        vi.mocked(authApi.getMe).mockRejectedValue(new Error('Unauthorized'));

        await useAuthStore.getState().refreshMember();

        expect(useAuthStore.getState().member).toBeNull();
        expect(useAuthStore.getState().loading).toBe(false);
    });

    it('logout should clear member', async () => {
        useAuthStore.setState({ member: { id: '1', nickname: 'user' } as any });
        vi.mocked(authApi.logout).mockResolvedValue(undefined);

        await useAuthStore.getState().logout();

        expect(useAuthStore.getState().member).toBeNull();
    });
});
