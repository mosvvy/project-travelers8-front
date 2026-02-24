import { Story } from '@/types/story';
import css from './TravellersStoriesItem.module.css';

import Button from '../Link/Link';

interface TravellersStoriesItemProps {
  story: Story;
}

export default function TravellersStoriesItem({ story }: TravellersStoriesItemProps) {
  return (
    <li className={css.storyItem}>
      <img src={story.imageUrl} alt={story.title} />

      <div className={css.storyContent}>
        <p className={css.storyCategory}>{story.category}</p>

        <h3 className={css.storyTitleCard}>{story.title}</h3>

        <p className={css.storyTextCard}>{story.content}</p>

        <div className={css.authorInfo}>
          <img className={css.authorAvatar} src={story.author.avatarUrl} alt={story.author.name} />
          <div className={css.authorDetails}>
            <p className={css.authorName}>{story.author.name}</p>
            <div className={css.storyMeta}>
              <p className={css.publishedAt}>{story.publishedAt}</p>
              <span className={css.metaSeparator}></span>
              <p className={css.favoriteCount}>{story.favoriteCount}</p>
              <svg className={css.actionIcon} width='16' height='16'>
                <use href='/icons/sprite.svg#icon-bookmark' />
              </svg>
            </div>
          </div>
        </div>

        <div className={css.storyActions}>
          <Button href={`/stories/${story.id}`} text='Переглянути статтю' variant='secondaryBtn' />
          <button className={css.favoriteButton}>
            <svg className={css.favoriteIcon} width='24' height='24'>
              <use href='/icons/sprite.svg#icon-bookmark' />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
