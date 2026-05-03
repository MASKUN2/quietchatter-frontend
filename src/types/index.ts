import type { components } from './api-schema';

export type Schemas = components['schemas'];

export interface PageInfo {
  first: boolean;
  last: boolean;
  number: number;
  totalPages: number;
}

export interface SliceInfo {
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export interface PageResponse<T> {
  content: T[];
  page: PageInfo;
}

export interface SliceResponse<T> extends SliceInfo {
  content: T[];
}

export type Book = components['schemas']['Book_BookResponse'];

export type Talk = NonNullable<components['schemas']['Talk_TalkPageResponse']['content']>[number] & {
  book?: {
    id: string;
    title: string;
    author?: string | null;
    cover?: string | null;
  };
};

export type Member = components['schemas']['Member_AuthMeResponse'];
