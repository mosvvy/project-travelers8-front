import { User } from './user';

export interface Story {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  publishedAt: string;
  category: {
    _id: string;
    name: string;
  };
  favoriteCount: number;
  isFavorite: boolean;
}
