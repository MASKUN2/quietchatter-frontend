import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Book, PageResponse, SliceResponse, Talk, Member, Schemas } from '../types';
import { API, MESSAGES, PAGINATION } from '../constants';

const apiClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
  timeout: API.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiError extends Error {
  response?: AxiosResponse;
  constructor(message: string, response?: AxiosResponse) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.response?.data?.message || error.message || MESSAGES.ERROR.API_REQUEST_FAILED;
    return Promise.reject(new ApiError(message, error.response));
  }
);

export async function getMe(): Promise<Member> {
  const response = await apiClient.get<Member>('/api/auth/me');
  return response.data;
}

export type NaverLoginResponse = Schemas['NaverLoginResponse'];

export async function loginWithNaver(code: string, state: string): Promise<NaverLoginResponse> {
  const response = await apiClient.post<NaverLoginResponse>('/api/auth/login/naver', { code, state });
  return response.data;
}

export async function signupWithNaver(nickname: string, registerToken: string): Promise<void> {
  // 백엔드 명세: Authorization 헤더에 Bearer 토큰으로 registerToken 전달
  await apiClient.post('/api/auth/signup', 
    { nickname },
    { headers: { Authorization: `Bearer ${registerToken}` } }
  );
}

export async function logout(): Promise<void> {
  await apiClient.post('/api/auth/logout');
}

export async function reactivateAccount(token: string): Promise<void> {
  // 백엔드 명세: Authorization 헤더에 Bearer 토큰으로 reactivationToken 전달
  await apiClient.post('/api/auth/reactivate', null, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function searchBooks(keyword: string, page: number = 0): Promise<SliceResponse<Book>> {
  const response = await apiClient.get<SliceResponse<Book>>('/api/books', {
    params: { keyword, page, sort: 'title,asc' }
  });
  return response.data;
}

export async function getBookDetails(bookId: string): Promise<Book> {
  const response = await apiClient.get<Book>(`/api/books/${bookId}`);
  return response.data;
}

export async function getBooksByIds(bookIds: string[]): Promise<Book[]> {
  if (!bookIds || bookIds.length === 0) {
    return [];
  }
  const response = await apiClient.get<Book[]>('/api/books', {
    params: { id: bookIds.join(',') }
  });
  return response.data;
}

export async function getTalks(bookId: string, page: number = 0): Promise<PageResponse<Talk>> {
  // 백엔드 명세: /api/talks/book/{bookId}
  const response = await apiClient.get<PageResponse<Talk>>(`/api/talks/book/${bookId}`, {
    params: { page, size: PAGINATION.TALK_LIST_SIZE, sort: 'createdAt,desc' }
  });
  return response.data;
}

export async function getRecommendedTalks(): Promise<Talk[]> {
  // 백엔드 명세: /api/talks/recommended
  const response = await apiClient.get<Talk[]>('/api/talks/recommended');
  return response.data;
}

export async function getMyTalks(memberId: string, page: number = 0): Promise<PageResponse<Talk>> {
  // 백엔드 명세: /api/talks?memberId={id}
  const response = await apiClient.get<PageResponse<Talk>>('/api/talks', {
    params: { memberId, page, size: PAGINATION.TALK_LIST_SIZE, sort: 'createdAt,desc' }
  });
  return response.data;
}

export async function updateProfile(nickname: string): Promise<void> {
  // 백엔드 명세: /api/members/me/profile
  await apiClient.put('/api/members/me/profile', { nickname });
}

export async function deactivateAccount(): Promise<void> {
  // 백엔드 명세: /api/members/me
  await apiClient.delete('/api/members/me');
}

export async function postTalk(bookId: string, content: string): Promise<Talk> {
  // 백엔드 명세: /api/talks, 필드명 dateToHidden (LocalDate 형식 기대하므로 YYYY-MM-DD 전달)
  const now = new Date();
  now.setFullYear(now.getFullYear() + 1); // 1년 후 자동 숨김 예시
  const dateToHidden = now.toISOString().split('T')[0];

  const response = await apiClient.post<Talk>('/api/talks', {
    bookId,
    content,
    dateToHidden: dateToHidden
  });
  return response.data;
}

export async function handleReaction(talkId: string, reactionType: 'LIKE' | 'SUPPORT', hasReacted: boolean): Promise<void> {
  // 백엔드 명세: /api/reactions/talks/{talkId}
  if (hasReacted) {
    await apiClient.delete(`/api/reactions/talks/${talkId}`, {
      data: { type: reactionType }
    });
  } else {
    await apiClient.post(`/api/reactions/talks/${talkId}`, {
      type: reactionType
    });
  }
}

export async function sendVocMessage(content: string): Promise<void> {
  // 백엔드 명세: /api/support/messages
  await apiClient.post('/api/support/messages', { content });
}

export async function updateTalk(talkId: string, content: string): Promise<void> {
  // 백엔드 명세: /api/talks/{talkId} (PUT)
  await apiClient.put(`/api/talks/${talkId}`, { content });
}

export async function deleteTalk(talkId: string): Promise<void> {
  // 백엔드 명세: /api/talks/{talkId}
  await apiClient.delete(`/api/talks/${talkId}`);
}
