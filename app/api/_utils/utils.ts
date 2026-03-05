import { cookies } from 'next/headers';
import { parse } from 'cookie';
import type { StoryRaw, Story } from '../_types/story';

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

type CookiesHeader = string | string[] | undefined;

export const setCookies = async (cookiesHeader: CookiesHeader): Promise<boolean> => {
  if (cookiesHeader) {
    const cookieArray = Array.isArray(cookiesHeader) ? cookiesHeader : [cookiesHeader];

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
