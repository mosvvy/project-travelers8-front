import css from './TravellersStories.module.css';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import type { IStory } from '@/types/story';

interface TravellersListProps {
  stories: IStory[];
}

export default function TravellersStories({ stories }: TravellersListProps) {
  return (
    <ul className={css.storiesList}>
      {stories.map(story => (
        <TravellersStoriesItem key={story._id} story={story} />
      ))}
    </ul>
  );
}
