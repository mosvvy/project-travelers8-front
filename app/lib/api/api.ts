import axios from 'axios';
import { Story } from '@/types/story';
import { Category } from '@/types/category';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

export const nextServer = axios.create({
  baseURL: '',
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

export type StoryResponse = Story;

export async function createStory(formData: FormData): Promise<CreateStoryResponse> {
  const res = await nextServer.post('/api/stories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return { _id: res.data.data?._id ?? res.data._id };
}

export async function updateStory(
  storyId: string,
  formData: FormData
): Promise<CreateStoryResponse> {
  const res = await nextServer.patch(`/api/stories/${storyId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return { _id: res.data.data?._id ?? res.data._id };
}

export async function getCategories(): Promise<Category[]> {
  const res = await nextServer.get<{ categories: Category[] }>('/api/categories');
  return res.data.categories;
}

export const getStoryById = async (id: string) => {
  const { data } = await api.get(`/stories/${id}`);
  return data;
};

export async function getStory(storyId: string): Promise<StoryResponse> {
  const { data } = await api.get<StoryResponse>(`/stories/${storyId}`);
  return data;
}
