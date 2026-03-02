'use client';
import css from './PopularStories.module.css';
import type { Story, IStory } from '@/types/story';
import Section from '../Section/Section';
import { useEffect, useState } from 'react';
import { getStories } from '@/app/lib/api/clientApi';
import TravellersStories from '../TravellersStories/TravellersStories';
import Link from '../Link/Link';
import { convertToIStory } from '@/app/api/_utils/utils';

const getLimit = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1440) return 3;
  if (window.innerWidth >= 768) return 4;
  return 3;
};

const PopularStories = () => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const limit = getLimit();
        const response = await getStories(1, 10);
        const allStories = response?.stories || [];
        setStories(allStories.slice(0, limit));
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      }
    };

    load();
    window.addEventListener('resize', load);
    return () => window.removeEventListener('resize', load);
  }, []);
  return (
    <Section>
      <h2 className={css.popularStoriesTitle}>Популярні історії</h2>
      <TravellersStories stories={stories.map(convertToIStory)} />
      <div className={css.viewAllWrapper}>
        <Link variant='primaryBtn' href='/stories' className={css.viewAllLink}>
          Переглянути всі
        </Link>
      </div>
    </Section>
  );
};

export default PopularStories;
