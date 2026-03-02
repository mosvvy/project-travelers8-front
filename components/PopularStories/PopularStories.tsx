'use client';
import css from './PopularStories.module.css';
import type { Story } from '@/types/story';
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
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const load = async () => {
      const limit = getLimit();
      const popular = await getPopularStories(limit);
      setStories(popular);
    };

    load();
    window.addEventListener('resize', load);
    return () => window.removeEventListener('resize', load);
  }, []);

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
