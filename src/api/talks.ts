import { apiClient } from './client';
import type { Talk, PageResponse } from '../types';
import { PAGINATION } from '../constants';

export async function getTalks(bookId: string, page: number = 0): Promise<PageResponse<Talk>> {
  const response = await apiClient.get<PageResponse<Talk>>(`/api/talks/book/${bookId}`, {
    params: { page, size: PAGINATION.TALK_LIST_SIZE, sort: 'createdAt,desc' }
  });
  return response.data;
}

export async function getRecommendedTalks(): Promise<Talk[]> {
  const response = await apiClient.get<Talk[]>('/api/talks/recommended');
  return response.data;
}

export async function getMyTalks(memberId: string, page: number = 0, hidden = false): Promise<PageResponse<Talk>> {
  const response = await apiClient.get<PageResponse<Talk>>('/api/talks', {
    params: { memberId, page, size: PAGINATION.TALK_LIST_SIZE, sort: 'createdAt,desc', hidden }
  });
  return response.data;
}

export async function restoreTalk(talkId: string): Promise<void> {
  await apiClient.post(`/api/talks/${talkId}/restore`);
}

export async function postTalk(bookId: string, content: string): Promise<Talk> {
  const now = new Date();
  now.setFullYear(now.getFullYear() + 1);
  const dateToHidden = now.toISOString().split('T')[0];

  const response = await apiClient.post<Talk>('/api/talks', {
    bookId,
    content,
    dateToHidden: dateToHidden
  });
  return response.data;
}

export async function handleReaction(talkId: string, reactionType: 'LIKE' | 'SUPPORT', hasReacted: boolean): Promise<void> {
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

export async function updateTalk(talkId: string, content: string): Promise<void> {
  await apiClient.put(`/api/talks/${talkId}`, { content });
}

export async function deleteTalk(talkId: string): Promise<void> {
  await apiClient.delete(`/api/talks/${talkId}`);
}
