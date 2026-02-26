import css from './TravellersList.module.css';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import type { Story } from '@/types/story';

interface TravellersListProps {
  stories: Story[];
}

export default function TravellersList({ stories }: TravellersListProps) {
  return (
    <ul className={css.storiesList}>
      {stories.map(story => (
        <li key={story.id}>
          <TravellersStoriesItem story={story} />
        </li>
      ))}
    </ul>
  );
}
