import axios from 'axios';
import { Story } from '@/types/story';
import { Category } from '@/types/category';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const nextServer = axios.create({
  baseURL: `${SITE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
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
  const res = await nextServer.post('/stories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return { _id: res.data.data?._id ?? res.data._id };
}

export async function updateStory(
  storyId: string,
  formData: FormData
): Promise<CreateStoryResponse> {
  const res = await nextServer.patch(`/stories/${storyId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return { _id: res.data.data?._id ?? res.data._id };
}

export async function getCategories(): Promise<Category[]> {
  const res = await nextServer.get<{ categories: Category[] }>('/categories');
  return res.data.categories;
}

export const getStoryById = async (id: string) => {
  const { data } = await nextServer.get(`/stories/${id}`);
  return data;
};

export async function getStory(storyId: string): Promise<StoryResponse> {
  const { data } = await nextServer.get<StoryResponse>(`/stories/${storyId}`);
  return data;
}
