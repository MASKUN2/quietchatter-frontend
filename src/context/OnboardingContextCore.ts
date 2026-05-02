import { createContext } from 'react';
import type { OnboardingRefs } from '../types/onboarding';

export const OnboardingContext = createContext<OnboardingRefs | null>(null);
