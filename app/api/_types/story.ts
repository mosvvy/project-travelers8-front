import type { AuthUser, AuthUserRaw } from '@/app/api/_types/auth-user';

export interface StoryRaw {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: StoryCategory;

  ownerId: Pick<AuthUserRaw, 'name' | 'avatarUrl'>;

  date: string;
  favoriteCount: number;
}

export interface StoryCategory {
  name: string;
}

export interface Story {
  id: string;
  img: string;
  title: string;
  article: string;
  category: StoryCategory;

  ownerId: Pick<AuthUser, 'name' | 'avatarUrl'>;

  date: string;
  favoriteCount: number;
}
