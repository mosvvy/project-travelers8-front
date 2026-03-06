import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await api.get('/users/me', {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status || 500;
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          serverDetails: error.response?.data,
        },
        { status }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
