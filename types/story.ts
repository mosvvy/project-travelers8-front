import { User } from "./user";
import { Category } from "./category";

export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category | string;
  ownerId: User | string;
  date: string;
  favoriteCount: number;
}

export interface CreateStoryFormValues {
  title: string;
  article: string;
  category: string;
  img: File | null;
  date: string;
}
export interface IStory {
  _id: string;

  img: string;
  title: string;
  article: string;
  category: {
    _id: string;
    name: string;
  } | null;
  shortDescription: string;

  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
  favoriteCount: number;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
   isFavorite?: boolean;
}

export interface IStoryByIdResponse {
  status: number;
  message: string;
  data: IStory;
}
export type PaginatedStoriesResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: IStory[];
};
export interface UpdateStoryResponse {
  status: number;
  message: string;
  data: IStory;
}

export interface CreateStory {
  storyImage: File | null;
  title: string;
  article: string;
  category: string;
  shortDescription: string;
}

export interface UpdateStory {
  storyImage?: File | null;
  title?: string;
  article?: string;
  category?: string;
  shortDescription: string;
}
export interface CreateStoryResponse {
  status: number;
  message: string;
  data: IStory;
}
