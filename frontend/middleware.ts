import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';
import { axiosInstance } from './config/axios';

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('token');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!jwt) return NextResponse.redirect(new URL('/signin', request.url));
      const response = await fetch(`${apiUrl}/empresa/verificar-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: jwt.value }),
      });
      const data = await response.json();
      if (response.status == 200) {
        Cookies.set('token', data.token, {
          expires: 7,
          secure: true,
          sameSite: 'none',
        });

        return NextResponse.next();
      }
      Cookies.remove('token');

      return NextResponse.redirect(new URL('/signin', request.url));
    }
  } catch (error) {
    console.log(error);
    Cookies.remove('token');
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/', '/((?!registrar|signin|api|_next|public).*)'],
};
