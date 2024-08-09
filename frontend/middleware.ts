// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('token');

  if (!jwt) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
console.log(jwt)
  try {

    const response = await fetch('https://localhost:3001/empresa/verificar-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: jwt.value }),
    });

    const data = await response.json();

    if (!data.valid) {
      throw new Error('Token inválido');
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/', '/((?!registrar|signin).*)'],
};
