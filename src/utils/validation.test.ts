import { describe, it, expect } from 'vitest';
import { validateNickname } from './validation';
import { MESSAGES } from '../constants';

describe('validateNickname utility', () => {
    it('should return valid for a normal nickname', () => {
        const result = validateNickname('조용한독서가');
        expect(result.isValid).toBe(true);
    });

    it('should return invalid for empty nickname', () => {
        const result = validateNickname('');
        expect(result.isValid).toBe(false);
        expect(result.message).toBe(MESSAGES.ERROR.NICKNAME_REQUIRED);
    });

    it('should return invalid for whitespace only', () => {
        const result = validateNickname('   ');
        expect(result.isValid).toBe(false);
        expect(result.message).toBe(MESSAGES.ERROR.NICKNAME_REQUIRED);
    });

    it('should return invalid for too long nickname', () => {
        const result = validateNickname('abcdefghijklm'); // 13 chars
        expect(result.isValid).toBe(false);
        expect(result.message).toBe(MESSAGES.ERROR.NICKNAME_LENGTH);
    });

    it('should return invalid for special characters', () => {
        const result = validateNickname('hello!');
        expect(result.isValid).toBe(false);
        expect(result.message).toBe(MESSAGES.ERROR.NICKNAME_SPECIAL_CHARS);
    });

    it('should allow spaces in the middle but not at start/end', () => {
        expect(validateNickname('Good Read').isValid).toBe(true);
        // validateNickname trims the input first, so start/end spaces are handled by trimming
        expect(validateNickname('  Trim Test  ').isValid).toBe(true);
    });

    it('should allow Korean, English, and Numbers', () => {
        expect(validateNickname('한글123ABC').isValid).toBe(true);
    });
});
