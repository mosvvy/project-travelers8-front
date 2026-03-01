export interface Category {
  _id: string;
  name: string;
}

export interface StoryOwner {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount?: number;
  description?: string;
}

export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category;
  ownerId: StoryOwner;
  date: string;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
}
