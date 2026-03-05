import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Number(searchParams.get('page') ?? 1);
    const perPage = Number(searchParams.get('perPage') ?? 12);
    const rawCategory = searchParams.get('category') ?? '';
    const category = rawCategory === 'All' ? '' : rawCategory;

    const res = await api('/stories', {
      params: {
        page,
        perPage,
        ...(category && { category }),
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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const apiRes = await api.post('/stories', formData, {
      headers: {
        'Content-Type': req.headers.get('Content-Type'),
        Cookie: req.headers.get('cookie') || '',
      },
    });

    return NextResponse.json(apiRes.data, {
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
