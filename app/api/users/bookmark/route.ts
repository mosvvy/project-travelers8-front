import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await api.post('/users/bookmark', body, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
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
