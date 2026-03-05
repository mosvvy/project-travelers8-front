'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/app/lib/api/api';
import type { IStory } from '@/types/story';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

const PER_PAGE = 6;

type FavouriteResponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  stories: IStory[];
};

const fetchSavedStories = async ({ pageParam = 1 }): Promise<FavouriteResponse> => {
  const { data } = await api.get<FavouriteResponse>('/stories/favourite', {
    params: { page: pageParam, perPage: PER_PAGE },
  });
  return data;
};

export default function SavedStories() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['savedStories'],
      queryFn: fetchSavedStories,
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      retry: false,
    });

  if (isLoading) return <p>Завантаження збережених історій...</p>;
  if (isError) return <p>Помилка завантаження.</p>;

  const stories = data?.pages.flatMap(p => p.stories) ?? [];

  return (
    <div style={{ paddingBottom: '80px' }}>
      {stories.length === 0 ? (
        <MessageNoStories
          text='У вас ще немає збережених історій...'
          buttonText='До історій'
          route='/stories'
        />
      ) : (
        <>
          <TravellersStories stories={stories} />

          {hasNextPage && (
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
              <button type='button' onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? 'Завантаження...' : 'Показати ще'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
