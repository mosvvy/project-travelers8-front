'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/app/lib/api/api';
import type { IStory } from '@/types/story';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

const PER_PAGE = 6;

type OwnResponse = {
  page: number;
  perPage: number;
  totalStories: number;
  totalPages: number;
  stories: IStory[];
};

const fetchOwnStories = async ({ pageParam = 1 }): Promise<OwnResponse> => {
  const { data } = await api.get<OwnResponse>('/stories/own', {
    params: { page: pageParam, perPage: PER_PAGE },
  });
  return data;
};

export default function OwnStories() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['ownStories'],
      queryFn: fetchOwnStories,
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      retry: false,
    });

  if (isLoading) return <p>Завантаження ваших історій...</p>;
  if (isError) return <p>Помилка завантаження.</p>;

  const stories = data?.pages.flatMap(p => p.stories) ?? [];

  return (
    <div style={{ paddingBottom: '80px' }}>
      {stories.length === 0 ? (
        <MessageNoStories
          text='Ви ще нічого не публікували...'
          buttonText='Опублікувати історію'
          route='/stories/create'
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
