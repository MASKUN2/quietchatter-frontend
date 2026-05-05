import { apiClient } from './client';
import type { Member } from '../types';

export async function getMe(): Promise<Member> {
  const response = await apiClient.get<Member>('/api/auth/me');
  return response.data;
}

export interface NaverLoginResponse {
  registered: boolean;
  registerToken?: string | null;
  tempNickname?: string | null;
}

export async function loginWithNaver(code: string, state: string): Promise<NaverLoginResponse> {
  const response = await apiClient.post<NaverLoginResponse>('/api/auth/login/naver', { code, state });
  return response.data;
}

export async function signupWithNaver(nickname: string, registerToken: string): Promise<void> {
  await apiClient.post('/api/auth/signup',
    { nickname },
    { headers: { Authorization: `Bearer ${registerToken}` } }
  );
}

export async function logout(): Promise<void> {
  await apiClient.post('/api/auth/logout');
}

export async function reactivateAccount(token: string): Promise<void> {
  await apiClient.post('/api/auth/reactivate', null, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function updateProfile(nickname: string): Promise<void> {
  await apiClient.put('/api/members/me/profile', { nickname });
}

export async function deactivateAccount(): Promise<void> {
  await apiClient.delete('/api/members/me');
}
