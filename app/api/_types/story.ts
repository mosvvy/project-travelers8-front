import type { AuthUser, AuthUserRaw } from '@/app/api/_types/auth-user';

export interface StoryCategory {
  _id: string;
  name: string;
}

export interface StoryRaw {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: StoryCategory;
  ownerId: {
    _id?: string;
    name: string;
    avatarUrl?: string;
  };
  date: string;
  favoriteCount: number;
}

export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: StoryCategory;
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
  favoriteCount: number;
}
