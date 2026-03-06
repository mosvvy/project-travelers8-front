import axios from 'axios';
import type { Story as SingleStory } from './types/stories';
import type { IStory } from '@/types/story';
import { AuthUser, AuthUserRaw } from '@/app/api/_types/auth-user';
import { PaginatedResponse } from '@/app/api/_types/paginated-response';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

type LoginPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  user: AuthUserRaw;
};

export const login = async (payload: LoginPayload): Promise<AuthUser> => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return toUser(data.user);
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const { data } = await api.get<AuthUserRaw>('/users/me');
  return toUser(data);
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.post<{ success: boolean }>('/auth/refresh');
  return data.success;
};

export const logout = async () => {
  const {
    data: { success },
  } = await api.post('/auth/logout');

  return !!success;
};

export const createStory = async (data: FormData) => {
  const res = await api.post('/stories', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export const ownStories = async (
  pageSize: number,
  page: number
): Promise<PaginatedResponse<'stories', IStory>> => {
  const res = await api.get<PaginatedResponse<'stories', IStory>>('/stories/own', {
    params: { page, perPage: pageSize },
  });

  return res.data;
};

export const savedStories = async (
  pageSize: number,
  page: number
): Promise<PaginatedResponse<'stories', IStory>> => {
  const res = await api.get<PaginatedResponse<'stories', IStory>>('/stories/saved', {
    params: { page, perPage: pageSize },
  });

  return res.data;
};

export const fetchStoryClient = async (storyId: string): Promise<SingleStory> => {
  const { data } = await api.get<SingleStory>(`/stories/${storyId}`);
  return data;
};

const toUser = (user: AuthUserRaw): AuthUser => {
  const { _id, avatarUrl, ...restUser } = user;

  return {
    ...restUser,
    id: _id,
    avatarUrl: avatarUrl ?? '/images/default-avatar.png',
  };
};
