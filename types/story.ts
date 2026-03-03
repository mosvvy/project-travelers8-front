<<<<<<< Updated upstream
export interface IStory {
  _id: string;
=======
export interface Story {
  id: string;
>>>>>>> Stashed changes
  img: string;
  title: string;
  article: string;
  category: {
<<<<<<< Updated upstream
    _id: string;
    name: string;
  };
  shortDescription: string;
=======
    id: string;
    name: string;
  };

>>>>>>> Stashed changes
  ownerId: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
<<<<<<< Updated upstream
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
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
  isFavorite?: boolean;
=======

  favoriteCount: number;
  //isFavorite: boolean;
>>>>>>> Stashed changes
}
