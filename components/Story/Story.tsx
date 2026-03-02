import { Story as StoryType } from '@/app/lib/api/types/stories';
import StoryHeader from './StoryHeader';
import css from './Story.module.css';
import StoryBody from './StoryBody';

const Story = ({ story }: { story: StoryType }) => {
  return (
    <>
      <div className={css.commonContainer}>
        <div className={css.storyElement}>
          <StoryHeader
            title={story.title}
            author={story.ownerId}
            publishedDate={story.date}
            category={story.category.name}
            imageUrl={story.img}
          />
        </div>
        <div className={css.storyElement}>
          <StoryBody article={story.article} _id={story._id}/>
        </div>
      </div>
    </>
  );
};

export default Story;
