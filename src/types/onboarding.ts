import React from 'react';

export interface OnboardingRefs {
    logoRef: React.RefObject<HTMLElement | null>;
    searchRef: React.RefObject<HTMLElement | null>;
    vocRef: React.RefObject<HTMLElement | null>;
    loginRef: React.RefObject<HTMLElement | null>;
    timerRef: React.RefObject<HTMLElement | null>;
    /** 홈 화면 첫 번째 추천 북톡 카드 */
    recommendedTalkRef: React.RefObject<HTMLElement | null>;
}
