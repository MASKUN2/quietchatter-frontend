import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useFirstVisit } from './useFirstVisit';

describe('useFirstVisit hook', () => {
    const TEST_KEY = 'test_visit_key';

    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
    });

    it('should return isFirstVisit as true initially', () => {
        const { result } = renderHook(() => useFirstVisit(TEST_KEY));
        expect(result.current.isFirstVisit).toBe(true);
    });

    it('should return isFirstVisit as false after markVisited is called', () => {
        const { result, rerender } = renderHook(() => useFirstVisit(TEST_KEY));
        
        act(() => {
            result.current.markVisited();
        });

        // re-render to pick up the new value
        rerender();
        
        expect(window.localStorage.setItem).toHaveBeenCalledWith(TEST_KEY, 'true');
        expect(result.current.isFirstVisit).toBe(false);
    });

    it('should pick up existing value from localStorage', () => {
        window.localStorage.setItem(TEST_KEY, 'true');
        const { result } = renderHook(() => useFirstVisit(TEST_KEY));
        expect(result.current.isFirstVisit).toBe(false);
    });
});
