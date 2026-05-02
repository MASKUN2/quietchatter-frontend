import React from 'react';
import type { OnboardingRefs } from '../types/onboarding';
import { OnboardingContext } from './OnboardingContextCore';

/** Context Provider: App 루트 혹은 Layout 컴포넌트에서 감싸세요 */
export const OnboardingProvider: React.FC<{
    children: React.ReactNode;
    refs: OnboardingRefs;
}> = ({ children, refs }) => {
    return (
        <OnboardingContext.Provider value={refs}>
            {children}
        </OnboardingContext.Provider>
    );
};
