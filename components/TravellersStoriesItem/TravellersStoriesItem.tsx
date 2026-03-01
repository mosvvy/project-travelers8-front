'use client';

import { Story } from '@/types/story';
import css from './TravellersStoriesItem.module.css';

import Link from '../Link/Link';
import Button from '../Button/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

import { useAuthStore } from '@/app/lib/store/authStore';
import { toggleFavorite } from '@/app/lib/api/clientApi';

interface TravellersStoriesItemProps {
  story: Story;
}

export default function TravellersStoriesItem({ story }: TravellersStoriesItemProps) {
  const [isFavorite, setIsFavorite] = useState(story.isFavorite);
  const [favoriteCount, setFavoriteCount] = useState(story.favoriteCount);
  const [isLoading, setIsLoading] = useState(false);

  //const { isAuth, openAuthModal } = useAuthStore();

  const handleFavoriteClick = async () => {
    //if (!isAuth) {
    //  openAuthModal();
    // return;
    //}

    try {
      await toggleFavorite(story.id);
      setIsFavorite(prev => !prev);
      setFavoriteCount(prev => (isFavorite ? prev - 1 : prev + 1));
    } catch (err) {
      toast.error('Не вдалося оновити збережені. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className={css.storyCard}>
      <div className={css.storyImageWrapper}>
        <Image
          src={story.img}
          alt={story.title}
          fill
          className='object-cover object-center'
          sizes='(max-width: 768px) 335px, (max-width: 1024px) 340px, 421px'
        />
      </div>

      <div className={css.storyContent}>
        <p className={css.storyCategory}>{story.category.name}</p>

        <h3 className={css.storyTitleCard}>{story.title}</h3>

        <p className={css.storyTextCard}>{story.article}</p>

        <div className={css.authorInfo}>
          <Image
            //className={css.authorAvatar}
            src={story.ownerId.avatarUrl}
            alt={story.ownerId.name}
            width={48}
            height={48}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />

          <div className={css.authorDetails}>
            <p className={css.authorName}>{story.ownerId.name}</p>
            <div className={css.storyMeta}>
              <p className={css.publishedAt}>{story.date}</p>
              <span className={css.metaSeparator}></span>
              <p className={css.favoriteCount}>{favoriteCount}</p>
              <svg className={css.actionIcon} width='16' height='16'>
                <use href='/icons/sprite.svg#icon-bookmark' />
              </svg>
            </div>
          </div>
        </div>

        <div className={css.storyActions}>
          <Link href={`/stories/${story.id}`} className={css.viewStoryLink} variant='secondaryBtn'>
            Переглянути статтю
          </Link>
          <Button className={css.favoriteButton} variant='secondary' onClick={handleFavoriteClick}>
            <svg className={css.favoriteIcon} width='24' height='24'>
              <use href='/icons/sprite.svg#icon-bookmark' />
            </svg>
          </Button>
        </div>
      </div>
    </article>
  );
}
