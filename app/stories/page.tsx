import css from './page.module.css';
import { fetchStories } from '../lib/api/serverApi';
import { StoriesResponse } from '../lib/api/clientApi';
import Image from 'next/image';

interface Props {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function StoriesPage({ searchParams }: Props) {
  const { page = '1', category = 'All' } = await searchParams;

  const data = (await fetchStories({ page: Number(page), category })) || { stories: [] };

  const stories = data?.stories ?? [];

  return (
    <>
      <h1 className={css.title}>Історії Мандрівників</h1>
    </>
  );
}
