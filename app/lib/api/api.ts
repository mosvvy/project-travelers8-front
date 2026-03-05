import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});
export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

export interface StoryPayload {
  title: string;
  category: string;
  article: string;
}

export type CreateStoryResponse = {
  _id: string;
};


export const getStoryById = async (id: string) => {
  const { data } = await api.get(`/stories/${id}`);
  return data;
};

export const createStory = async (data: FormData) => {
  const res = await api.post('/stories', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};


export interface StoryResponse {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: {
    _id: string;
    name: string;
  };
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
  favoriteCount: number;
}

export async function getStory(
  storyId: string
): Promise<StoryResponse> {
  const { data } = await api.get<StoryResponse>(
    `/stories/${storyId}`
  );

  return data;
}
export async function updateStory(
  storyId: string,
  formData: FormData
): Promise<CreateStoryResponse> {
  const { data } = await api.patch<CreateStoryResponse>(
    `/stories/${storyId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return data;
}