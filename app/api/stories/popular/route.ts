import { NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await api.get('/stories/popular');
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
