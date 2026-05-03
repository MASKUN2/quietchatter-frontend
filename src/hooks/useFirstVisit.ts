import { useState, useEffect } from 'react';

export interface OnboardingState {
    version: number;
    optedOut: boolean;
}

export interface VisitKeyConfig {
    key: string;
    version: number;
}

/** localStorage 키 및 버전 상수 모음 — 여기에만 추가하면 됩니다 */
export const VISIT_KEYS: Record<string, VisitKeyConfig> = {
    /** 홈 온보딩 툴팁 완료 */
    HOME: { key: 'onboarding_home_state', version: 1 },
    /** 책 상세 페이지 방문 */
    BOOK_DETAIL: { key: 'onboarding_book_detail_state', version: 1 },
} as const;

/**
 * useOnboardingState
 *
 * 로컬 스토리지의 키와 버전을 기반으로 온보딩 가이드를 표시할지 여부를 결정합니다.
 *
 * @param config  VISIT_KEYS에서 가져온 설정 객체
 *
 * - shouldShow: true이면 온보딩 가이드를 표시해야 함
 * - optOut:     다시 보지 않기를 선택했을 때 호출하여 영구 숨김 처리
 */
export function useOnboardingState(config: VisitKeyConfig): {
    shouldShow: boolean;
    optOut: () => void;
} {
    const [shouldShow, setShouldShow] = useState(true);

    useEffect(() => {
        try {
            const rawState = localStorage.getItem(config.key);
            if (rawState) {
                const state: OnboardingState = JSON.parse(rawState);
                if (state.version >= config.version && state.optedOut) {
                    setShouldShow(false);
                    return;
                }
            }
        } catch (e) {
            console.error('Failed to parse onboarding state', e);
        }
        // 버전이 낮거나 optedOut이 false인 경우, 혹은 데이터가 없는 경우는 보여줌
        setShouldShow(true);
    }, [config.key, config.version]);

    const optOut = () => {
        const state: OnboardingState = {
            version: config.version,
            optedOut: true,
        };
        localStorage.setItem(config.key, JSON.stringify(state));
        setShouldShow(false);
    };

    return { shouldShow, optOut };
}
