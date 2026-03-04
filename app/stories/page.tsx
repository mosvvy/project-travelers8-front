import StoriesPageClient from './StoriesPage.client';
import Section from '@/components/Section/Section';
import css from './page.module.css';

export default async function StoriesPage() {
  const [storiesRes, categoriesRes] = await Promise.all([
    fetch('https://project-travelers8-back.onrender.com/stories?page=1&perPage=1', {
      cache: 'no-store',
    }),
    fetch('https://project-travelers8-back.onrender.com/categories', {
      cache: 'no-store',
    }),
  ]);

  const storiesData = await storiesRes.json();
  const categoriesData = await categoriesRes.json();

  return (
    <Section>
      <StoriesPageClient totalStories={storiesData.totalStories} categories={categoriesData.data} />
    </Section>
  );
}
