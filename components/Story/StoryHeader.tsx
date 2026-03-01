import Image from 'next/image';
import { User } from '@/app/lib/api/types/profile';
import Badge from '../Badge/Badge';
import css from './Story.module.css';

const StoryHeader = ({
  title,
  author,
  publishedDate,
  category,
  imageUrl,
}: {
  title: string;
  author: User;
  publishedDate: string;
  category: string;
  imageUrl: string;
}) => {
  return (
    <>
      <h1>{title}</h1>
      <div className={css.headerMeta}>
        <div className={css.storyMeta}>
          <p>
            <b>Автор статті:</b> {author.name}
          </p>
          <p>
            <b>Опубліковано:</b> {publishedDate}
          </p>
        </div>
        <Badge>{category}</Badge>
      </div>
      <div className={css.imageContainer}>
        <Image src={imageUrl} alt={title} fill={true} className={css.image} />
      </div>
    </>
  );
};

export default StoryHeader;
