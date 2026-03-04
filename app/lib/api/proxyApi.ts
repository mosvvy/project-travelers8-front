import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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

export const createStory = async (data: FormData) => {
  console.log('Creating story with data:', data);
  const res = await api.post('/stories', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
