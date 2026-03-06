import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { setCookies } from '../../_utils/serverCookies';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    if (accessToken) {
      return NextResponse.json({ success: true });
    }

    const refreshToken = cookieStore.get('refreshToken')?.value;
    if (refreshToken) {
      const apiRes = await api.post('auth/refresh', null, {
        headers: { Cookie: cookieStore.toString() },
      });
      const success = await setCookies(apiRes.headers['set-cookie']);

      return NextResponse.json({ success });
    }

    return NextResponse.json({ success: false });
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
