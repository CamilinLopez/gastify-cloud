import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';
//https://gastify-cloud.onrender.com/empresa/verificar-token
export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('token');
  try {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!jwt) return NextResponse.redirect(new URL('/signin', request.url));
      const response = await fetch('http://localhost:3001/empresa/verificar-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: jwt.value }),
      });

      const data = await response.json();

      if (response.status == 200) {
        Cookies.set('token', data.token, {
          expires: 7, // La cookie expirará en 7 días
          secure: true, // Solo en HTTPS defaul true
          sameSite: 'none', // Misma política de sitio
        });

        return NextResponse.next();
      }
      Cookies.remove('token');

      return NextResponse.redirect(new URL('/signin', request.url));
    }
  } catch (error) {
    Cookies.remove('token');
    setTimeout(() => {
      console.log('Esto se muestra después de 3 segundos.');
    }, 15000);
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/', '/((?!registrar|signin|api|_next|public).*)'],
};
