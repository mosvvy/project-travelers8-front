export interface Story {
  id: string;
  img: string;
  title: string;
  article: string;
  category: {
    id: string;
    name: string;
  };

  ownerId: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;

  favoriteCount: number;
  //isFavorite: boolean;
}
