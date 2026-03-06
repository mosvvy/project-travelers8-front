import axios from 'axios';
import type { Story as SingleStory } from './types/stories';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BACKEND_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

const serverApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchStoryServer = async (storyId: string): Promise<SingleStory> => {
  const { data } = await serverApi.get<SingleStory>(`/stories/${storyId}`);
  return data;
};
