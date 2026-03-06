import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '@/app/api/api';
import { toStoryType, logErrorResponse } from '@/app/api/_utils/utils';
import type { PaginatedResponse } from '@/app/api/_types/paginated-response';
import type { StoryRaw } from '@/app/api/_types/story';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Number(searchParams.get('page'));
    const perPage = Number(searchParams.get('perPage'));

    const res = await api.get<PaginatedResponse<'stories', StoryRaw>>('/stories/favourite', {
      params: { page, perPage },
      headers: { Cookie: request.headers.get('cookie') },
    });

    const { stories, ...paginationMeta } = res.data;

    return NextResponse.json({
      ...paginationMeta,
      stories: stories.map(story => toStoryType(story)),
    });
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
