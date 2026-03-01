import { cookies } from 'next/headers';
import { api, StoriesResponse, FetchStoriesParams } from './clientApi';

export const fetchStories = async (params: FetchStoriesParams = {}): Promise<StoriesResponse> => {
  const cookieStore = await cookies();
  const { page, perPage, category } = params;

  const { data } = await api.get<StoriesResponse>('/stories', {
    params: {
      page,
      perPage,
      ...(category && category !== 'All' ? { category } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
