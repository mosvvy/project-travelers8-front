import axios from 'axios';
import type { AuthResponse } from './types/auth-response';
import type { RegisterPayload } from './types/register-payload';
import type { Story as SingleStory } from './types/stories';
import { AuthUser, AuthUserRaw } from './types/auth-user';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

type LoginPayload = {
  email: string;
  password: string;
};

export const login = async (payload: LoginPayload): Promise<AuthUser> => {
  const {
    data: { user },
  } = await api.post<AuthResponse>('/auth/login', payload);

  return toUser(user);
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

export const fetchStory = async (storyId: string): Promise<SingleStory> => {
  const { data } = await api.get<SingleStory>(`/stories/${storyId}`);

  return data;
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

const toUser = (user: AuthUserRaw): AuthUser => {
  const { _id, avatarUrl, ...restUser } = user;

  return { ...restUser, id: _id, avatarUrl: avatarUrl ?? '/images/default-avatar.png' };
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
};
