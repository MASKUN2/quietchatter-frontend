import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useOnboardingState } from './useFirstVisit';
import type { VisitKeyConfig } from './useFirstVisit';

describe('useOnboardingState hook', () => {
    const TEST_CONFIG: VisitKeyConfig = { key: 'test_visit_key', version: 1 };

    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
    });

    it('should return shouldShow as true initially', () => {
        const { result } = renderHook(() => useOnboardingState(TEST_CONFIG));
        expect(result.current.shouldShow).toBe(true);
    });

    it('should return shouldShow as false after optOut is called', () => {
        const { result, rerender } = renderHook(() => useOnboardingState(TEST_CONFIG));
        
        act(() => {
            result.current.optOut();
        });

        rerender();
        
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            TEST_CONFIG.key, 
            JSON.stringify({ version: TEST_CONFIG.version, optedOut: true })
        );
        expect(result.current.shouldShow).toBe(false);
    });

    it('should pick up existing optedOut value from localStorage if version matches', () => {
        window.localStorage.setItem(TEST_CONFIG.key, JSON.stringify({ version: 1, optedOut: true }));
        const { result } = renderHook(() => useOnboardingState(TEST_CONFIG));
        expect(result.current.shouldShow).toBe(false);
    });

    it('should return shouldShow true if stored version is lower', () => {
        window.localStorage.setItem(TEST_CONFIG.key, JSON.stringify({ version: 0, optedOut: true }));
        const { result } = renderHook(() => useOnboardingState(TEST_CONFIG));
        expect(result.current.shouldShow).toBe(true);
    });
});
