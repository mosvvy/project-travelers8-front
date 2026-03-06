<<<<<<< HEAD
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import type { StoryRaw, Story } from '../_types/story';
=======
import { Story, IStory } from '@/types/story';

>>>>>>> main

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


<<<<<<< HEAD
    for (const cookieString of cookieArray) {
      const cookieStore = await cookies();
      const [nameValue] = cookieString.split(';');
      const [name, value] = nameValue.split('=');
      const parsedCookies = parse(cookieString);

      cookieStore.set({
        name,
        value,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: parsedCookies.Path || '/',
        maxAge: Number(parsedCookies['Max-Age']),
        expires: parsedCookies.Expires ? new Date(parsedCookies.Expires) : undefined,
      });
    }

    return true;
  }

  return false;
};

export const toStoryType = (story: StoryRaw): Story => {
  const { _id, ownerId, ...restStory } = story;

  return {
    ...restStory,
    id: _id,
    ownerId: { name: ownerId.name, avatarUrl: ownerId.avatarUrl ?? '/images/default-avatar.png' },
  };
};
=======
>>>>>>> main
