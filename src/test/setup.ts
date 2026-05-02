import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 각 테스트 종료 후 DOM 정리
afterEach(() => {
  cleanup();
});
