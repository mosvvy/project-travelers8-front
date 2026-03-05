import axios from 'axios';
import { AuthUser, AuthUserRaw } from '../../api/_types/auth-user';
import type { PaginatedResponse } from '@/app/api/_types/paginated-response';
import type { Story } from '@/app/api/_types/story';

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
  console.log('Creating story with data:', data);
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
): Promise<PaginatedResponse<'stories', Story>> => {
  const res = await api.get<PaginatedResponse<'stories', Story>>('/stories/own', {
    params: { page, perPage: pageSize },
  });

  return res.data;
};

const toUser = (user: AuthUserRaw): AuthUser => {
  const { _id, avatarUrl, ...restUser } = user;

  return { ...restUser, id: _id, avatarUrl: avatarUrl ?? '/images/default-avatar.png' };
};
