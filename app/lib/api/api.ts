import axios from "axios";

export const api = axios.create({
  baseURL:    'http://localhost:3000/api',
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
  const res = await axios.post('/stories', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateStory = async (id: string, data: FormData) => {
  const res = await axios.patch(`/stories/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};