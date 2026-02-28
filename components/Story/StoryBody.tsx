'use client';

import { Story } from '@/app/lib/api/types/stories';
import css from './Story.module.css';
import Button from '../Button/Button';

const AddToFavorites = ({ storyId }: { storyId: string }) => {
  return (
    <div className={css.innerFavoritesBox}>
      <h3>Збережіть собі історію</h3>
      <p>Вона буде доступна у вашому профілі у розділі збережене</p>
      <div className={css.buttonContainer}>
        <Button
          fullWidth={true}
          variant='primary'
          onClick={() => alert(`Story ${storyId} added to favorites!`)}
        >
          Зберегти
        </Button>
      </div>
    </div>
  );
};

const StoryBody = ({ article, _id }: Pick<Story, 'article' | '_id'>) => {
  return (
    <div className={css.articleContainer}>
      <p className={css.article}>{article}</p>
      <AddToFavorites storyId={_id} />
    </div>
  );
};

export default StoryBody;
