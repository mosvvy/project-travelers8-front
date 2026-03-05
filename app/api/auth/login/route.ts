import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { setCookies } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('auth/login', body);

    await setCookies(apiRes.headers['set-cookie']);

    return NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.error || error.message,
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
