import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';
import { Story, StoryRaw } from '@/app/api/_types/story';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 12);
    const rawCategory = searchParams.get('category') ?? '';
    const category = rawCategory === 'All' ? '' : rawCategory;

    const res = await api.get<{
      page: number;
      perPage: number;
      totalItems: number;
      totalPages: number;
      stories: StoryRaw[];
    }>('/stories', {
      params: {
        page,
        perPage,
        ...(category && { category }),
      },
    });
    const { stories, ...rest } = res.data;

    return NextResponse.json({
      ...rest,
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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const apiRes = await api.post<StoryRaw>('/stories', formData, {
      headers: {
        'Content-Type': req.headers.get('Content-Type'),
        Cookie: req.headers.get('cookie') || '',
      },
    });

    return NextResponse.json(toStoryType(apiRes.data), {
      status: apiRes.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        return NextResponse.json(error.response.data.validation.body, { status: 400 });
      }

      return NextResponse.json(
        {
          error: error.response?.data?.error || error.message,
          message: error.response?.data?.message,
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

const toStoryType = (story: StoryRaw): Story => {
  const { _id, ownerId, ...restStory } = story;

  return {
    ...restStory,
    id: _id,
    ownerId: { name: ownerId.name, avatarUrl: ownerId.avatarUrl || '/image/default-avatar.png' },
  };
};
