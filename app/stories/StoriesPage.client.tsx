'use client';

import { useEffect, useState } from 'react';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import Button from '@/components/Button/Button';
import type { IStory } from '@/types/story';
import type { ICategory } from '@/types/category';
import css from './page.module.css';

const getInitialPerPage = () => {
  if (typeof window === 'undefined') return 9;
  if (window.innerWidth >= 1440) return 9;
  if (window.innerWidth >= 768) return 8;
  return 9;
};

const LOAD_STEP = 3;

export default function StoriesPageClient({
  totalStories,
  categories,
}: {
  totalStories: number;
  categories: ICategory[];
}) {
  const [stories, setStories] = useState<IStory[]>([]);
  const [perPage, setPerPage] = useState(getInitialPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const selectedCategoryName =
    selectedCategory === null
      ? 'Всі історії'
      : (categories.find(c => c._id === selectedCategory)?.name ?? 'Всі історії');

  useEffect(() => {
    let cancelled = false;

    const fetchStories = async () => {
      setIsLoading(true);
      const url = new URL('https://project-travelers8-back.onrender.com/stories');
      url.searchParams.set('page', '1');
      url.searchParams.set('perPage', String(perPage));
      if (selectedCategory) url.searchParams.set('category', selectedCategory);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (!cancelled) {
        setStories(data.stories);
        setIsLoading(false);
      }
    };

    fetchStories();
    return () => {
      cancelled = true;
    };
  }, [perPage, selectedCategory]);

  useEffect(() => {
    if (!isSelectOpen) return;
    const close = () => setIsSelectOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [isSelectOpen]);

  const handleLoadMore = () => setPerPage(prev => prev + LOAD_STEP);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setPerPage(getInitialPerPage());
    setIsSelectOpen(false);
  };

  const hasMore = stories.length < totalStories;

  return (
    <div className={css.storiesPageContainer}>
      <h2 className={css.storiesTitle}>Історії Мандрівників</h2>

      <div
        className={css.selectWrapper}
        role='combobox'
        aria-controls='category-listbox'
        aria-haspopup='listbox'
        aria-expanded={isSelectOpen}
        onClick={e => e.stopPropagation()}
      >
        <button className={css.mobileCategoryButton} onClick={() => setIsSelectOpen(prev => !prev)}>
          {selectedCategoryName}
          <svg
            className={`${css.selectArrow} ${isSelectOpen ? css.selectArrowOpen : ''}`}
            width='24'
            height='24'
          >
            <use href='/icons/sprite.svg#icon-keyboard_arrow_down' />
          </svg>
        </button>

        {isSelectOpen && (
          <ul className={css.mobileDropdown} role='listbox'>
            <li role='option' aria-selected={selectedCategory === null}>
              <button onClick={() => handleCategoryChange(null)}>Всі історії</button>
            </li>
            {categories.map(cat => (
              <li key={cat._id} role='option' aria-selected={selectedCategory === cat._id}>
                <button onClick={() => handleCategoryChange(cat._id)}>{cat.name}</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className={css.categoriesList}>
        <li className={css.categoryItem}>
          <button
            className={selectedCategory === null ? css.activeCategory : css.categoryBtn}
            onClick={() => handleCategoryChange(null)}
          >
            Всі історії
          </button>
        </li>
        {categories.slice(0, 4).map(cat => (
          <li className={css.categoryItem} key={cat._id}>
            <button
              className={selectedCategory === cat._id ? css.activeCategory : css.categoryBtn}
              onClick={() => handleCategoryChange(cat._id)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>

      <TravellersStories stories={stories} />

      {hasMore && (
        <Button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Завантаження...' : 'Переглянути ще'}
        </Button>
      )}
    </div>
  );
}
