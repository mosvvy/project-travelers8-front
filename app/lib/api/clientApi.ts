import { Story } from '@/types/story';
import axios from 'axios';
import { Story } from './types/stories';

export type StoriesResponse = {
  page: number;
  perPage: number;
  totalStories: number;
  totalPages: number;
  stories: Story[];
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type AuthResponse = {
  user: AuthUser;
};

type GetStoryResponse = Story;

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // если бек работает через cookies-сессию
  headers: { 'Content-Type': 'application/json' },
});

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
};

export const fetchStory = async (storyId: string): Promise<GetStoryResponse> => {
  const { data } = await api.get<GetStoryResponse>(`/stories/${storyId}`);

  return data;
};

export const getStories = async (page: number, perPage: number): Promise<StoriesResponse> => {
  const { data } = await api.get<StoriesResponse>('/stories', {
    params: { page, perPage },
  });
  return data;
};

export const toggleFavorite = async (storyId: string): Promise<void> => {
  await api.post('/users/bookmark', { storyId });
};
