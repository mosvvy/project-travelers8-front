import { cookies } from 'next/headers';
import { parse } from 'cookie';
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
        sameSite: 'lax',
        path: parsedCookies.Path || '/',
        maxAge: Number(parsedCookies['Max-Age']),
        expires: parsedCookies.Expires ? new Date(parsedCookies.Expires) : undefined,
      });
    }

    return true;
  }

  return false;
};