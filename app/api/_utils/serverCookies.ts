import { cookies } from 'next/headers';
import { parse } from 'cookie';

type CookiesHeader = string | string[] | undefined;

export const setCookies = async (cookiesHeader: CookiesHeader): Promise<boolean> => {
  if (!cookiesHeader) return false;

  const cookieStore = await cookies();
  const cookieArray = Array.isArray(cookiesHeader) ? cookiesHeader : [cookiesHeader];

  for (const cookieString of cookieArray) {
    const [nameValue] = cookieString.split(';');
    const [name, value] = nameValue.split('=');

    const parsed = parse(cookieString);

    cookieStore.set({
      name,
      value,
      httpOnly: /httponly/i.test(cookieString),
      secure: /secure/i.test(cookieString),
      sameSite: cookieString.toLowerCase().includes('samesite=none')
        ? 'none'
        : cookieString.toLowerCase().includes('samesite=strict')
          ? 'strict'
          : 'lax',
      path: parsed.Path || '/',
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
    });
  }

  return true;
};
