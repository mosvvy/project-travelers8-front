import axios from 'axios';
import type { Story as SingleStory } from './types/stories';

const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const PROXY_URL = process.env.VERCEL_URL ?? 'localhost:3001';

const api = axios.create({
  baseURL: `${PROTOCOL}://${PROXY_URL}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

type LoginPayload = {
  email: string;
  password: string;
};

type AuthUser = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthResponse = {
  user: AuthUser;
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);

  return data;
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
