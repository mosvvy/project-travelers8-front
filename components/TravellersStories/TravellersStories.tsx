import css from './TravellersStories.module.css';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import type { Story } from '@/types/story';

interface TravellersListProps {
  stories: Story[];
}

export default function TravellersStories({ stories }: TravellersListProps) {
  return (
    <ul className={css.storiesList}>
      {stories.map(story => (
        <TravellersStoriesItem key={story.id} story={story} />
      ))}
    </ul>
  );
}
