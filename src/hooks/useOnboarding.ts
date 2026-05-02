import { useContext, useRef } from 'react';
import { OnboardingContext } from '../context/OnboardingContextCore';
import type { OnboardingRefs } from '../types/onboarding';

/** ref 오브젝트를 읽는 훅 */
export function useOnboardingRefs(): OnboardingRefs {
    const ctx = useContext(OnboardingContext);
    if (!ctx) throw new Error('useOnboardingRefs must be used within OnboardingProvider');
    return ctx;
}

/**
 * useOnboardingRefsState
 *
 * OnboardingProvider를 사용하는 컴포넌트(App 혹은 Layout)에서 refs를 생성할 때
 * 이 훅을 사용하여 한 곳에서 모든 ref를 보관합니다.
 */
export function useOnboardingRefsState(): OnboardingRefs {
    const logoRef = useRef<HTMLElement | null>(null);
    const searchRef = useRef<HTMLElement | null>(null);
    const vocRef = useRef<HTMLElement | null>(null);
    const loginRef = useRef<HTMLElement | null>(null);
    const timerRef = useRef<HTMLElement | null>(null);
    const recommendedTalkRef = useRef<HTMLElement | null>(null);
    return { logoRef, searchRef, vocRef, loginRef, timerRef, recommendedTalkRef };
}
