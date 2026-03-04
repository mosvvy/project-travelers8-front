'use client';
import css from './PopularStories.module.css';
import type { IStory } from '@/types/story';
import Section from '../Section/Section';
import { useEffect, useState } from 'react';
import { getPopularStories } from '@/app/lib/api/clientApi';
import TravellersStories from '../TravellersStories/TravellersStories';
import Link from '../Link/Link';

const getLimit = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1440) return 3;
  if (window.innerWidth >= 768) return 4;
  return 3;
};

const PopularStories = () => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [initialData, setInitialData] = useState<IStory[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPopularStories();
        setInitialData(data);
        setStories(data.slice(0, getLimit()));
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      }
    };

    load();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setStories(initialData.slice(0, getLimit()));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialData]);
  return (
    <Section>
      <h2 className={css.popularStoriesTitle}>Популярні історії</h2>
      <TravellersStories stories={stories} />
      <div className={css.viewAllWrapper}>
        <Link variant='primaryBtn' href='/stories' className={css.viewAllLink}>
          Переглянути всі
        </Link>
      </div>
    </Section>
  );
};

export default PopularStories;
