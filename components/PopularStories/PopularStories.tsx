'use client';
import css from './PopularStories.module.css';
import type { Story } from '@/types/story';
import Section from '../Section/Section';
import { useEffect, useState } from 'react';
import { getStories } from '@/app/lib/api/clientApi';
import TravellersStories from '../TravellersStories/TravellersStories';
import Link from '../Link/Link';

const mockStories: Story[] = [
  {
    id: '68498236a100312bea07900b',
    img: 'https://ftp.goit.study/img/travel-blog/68498236a100312bea07900b.webp',
    title: 'Єгипет: враження від Луксора',
    article:
      'Луксор — це справжній музей під відкритим небом. Ми відвідали Долину царів, де збереглися гробниці фараонів із розписами, що сяють і сьогодні. Храм Хатшепсут вразив величчю і масштабом. А вечірня прогулянка вздовж Нілу залишила особливі спогади. Єгипет — це країна, де історія оживає на кожному кроці.',
    category: {
      id: '68fb50c80ae91338641121f4',
      name: 'Африка',
    },
    ownerId: {
      id: '6881563901add19ee16fd010',
      name: 'Назар Романенко',
      avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd010.webp',
    },
    date: '2024-11-03',
    favoriteCount: 20,
  },
  {
    id: '68498236a100312bea07900b',
    img: 'https://ftp.goit.study/img/travel-blog/68498236a100312bea07900b.webp',
    title: 'Єгипет: враження від Луксора',
    article:
      'Луксор — це справжній музей під відкритим небом. Ми відвідали Долину царів, де збереглися гробниці фараонів із розписами, що сяють і сьогодні. Храм Хатшепсут вразив величчю і масштабом. А вечірня прогулянка вздовж Нілу залишила особливі спогади. Єгипет — це країна, де історія оживає на кожному кроці.',
    category: {
      id: '68fb50c80ae91338641121f4',
      name: 'Африка',
    },
    ownerId: {
      id: '6881563901add19ee16fd010',
      name: 'Назар Романенко',
      avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd010.webp',
    },
    date: '2024-11-03',
    favoriteCount: 20,
  },
  {
    id: '68498236a100312bea07900b',
    img: 'https://ftp.goit.study/img/travel-blog/68498236a100312bea07900b.webp',
    title: 'Єгипет: враження від Луксора',
    article:
      'Луксор — це справжній музей під відкритим небом. Ми відвідали Долину царів, де збереглися гробниці фараонів із розписами, що сяють і сьогодні. Храм Хатшепсут вразив величчю і масштабом. А вечірня прогулянка вздовж Нілу залишила особливі спогади. Єгипет — це країна, де історія оживає на кожному кроці.',
    category: {
      id: '68fb50c80ae91338641121f4',
      name: 'Африка',
    },
    ownerId: {
      id: '6881563901add19ee16fd010',
      name: 'Назар Романенко',
      avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd010.webp',
    },
    date: '2024-11-03',
    favoriteCount: 20,
  },
  {
    id: '68498236a100312bea07900b',
    img: 'https://ftp.goit.study/img/travel-blog/68498236a100312bea07900b.webp',
    title: 'Єгипет: враження від Луксора',
    article:
      'Луксор — це справжній музей під відкритим небом. Ми відвідали Долину царів, де збереглися гробниці фараонів із розписами, що сяють і сьогодні. Храм Хатшепсут вразив величчю і масштабом. А вечірня прогулянка вздовж Нілу залишила особливі спогади. Єгипет — це країна, де історія оживає на кожному кроці.',
    category: {
      id: '68fb50c80ae91338641121f4',
      name: 'Африка',
    },
    ownerId: {
      id: '6881563901add19ee16fd010',
      name: 'Назар Романенко',
      avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd010.webp',
    },
    date: '2024-11-03',
    favoriteCount: 20,
  },
];

const getLimit = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1440) return 3;
  if (window.innerWidth >= 768) return 4;
  return 3;
};

const PopularStories = () => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const load = () => {
      const limit = getLimit();
      setStories(mockStories.slice(0, limit));
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
