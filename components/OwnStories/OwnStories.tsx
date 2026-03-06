'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ownStories } from '@/app/lib/api/proxyApi';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

const PER_PAGE = 6;

export default function OwnStories() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['ownStories'],
      queryFn: ({ pageParam }) => ownStories(PER_PAGE, pageParam),
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
          text='Ви ще нічого не публікували, поділіться своєю першою історією!'
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
