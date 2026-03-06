import type { IStory } from '@/types/story';
import type { Story, StoryRaw } from '@/app/api/_types/story';

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
  category: {
    _id: story.category._id,
    name: story.category.name,
  },
  ownerId: {
    _id: story.ownerId._id,
    name: story.ownerId.name,
    avatarUrl: story.ownerId.avatarUrl || '/images/default-avatar.png',
  },
  date: story.date,
  favoriteCount: story.favoriteCount,
  isFavorite: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const toStoryType = (story: StoryRaw): Story => ({
  _id: story._id,
  img: story.img,
  title: story.title,
  article: story.article,
  category: {
    _id: story.category._id,
    name: story.category.name,
  },
  ownerId: {
    _id: story.ownerId._id ?? '',
    name: story.ownerId.name,
    avatarUrl: story.ownerId.avatarUrl ?? '/images/default-avatar.png',
  },
  date: story.date,
  favoriteCount: story.favoriteCount,
});
