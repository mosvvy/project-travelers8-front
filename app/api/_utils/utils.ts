import { Story, IStory } from '@/types/story';

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export const convertToIStory = (story: Story): IStory => ({
  _id: story._id,
  img: story.img,
  title: story.title,
  article: story.article,
  shortDescription: story.article.slice(0, 100),
  category: typeof story.category === 'string' 
    ? { _id: story.category, name: story.category } 
    : story.category,
  ownerId: typeof story.ownerId === 'string' 
    ? { _id: story.ownerId, name: 'Unknown', avatarUrl: '' } 
    : story.ownerId,
  date: story.date,
  favoriteCount: story.favoriteCount,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});


