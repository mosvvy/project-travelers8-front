export interface Story {
  category: string;
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  publishedAt: string;
  favoriteCount: number;
  isFavorite: boolean;
}
