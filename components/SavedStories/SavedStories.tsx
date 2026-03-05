'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { savedStories } from '@/app/lib/api/proxyApi';

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

const PER_PAGE = 6;

export default function SavedStories() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['savedStories'],
      queryFn: ({ pageParam }) => savedStories(PER_PAGE, pageParam),
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
