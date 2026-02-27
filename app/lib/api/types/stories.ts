import { Category } from './category';
import { User } from './profile';

export type Story = {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category;
  ownerId: User;
  favoriteCount: number;
  date: string;
};
