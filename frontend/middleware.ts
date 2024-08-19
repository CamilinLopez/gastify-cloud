import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('token');

  try {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!jwt) return NextResponse.redirect(new URL('/signin', request.url));
      const response = await fetch('https://gastify-cloud.onrender.com/verificar-token', {
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
    console.error('Error verifying JWT token:', error);
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/', '/((?!registrar|signin|api|_next|public).*)'],
};

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// // import Cookies from 'js-cookie';

// export async function middleware(request: NextRequest) {
//   const jwt = request.cookies.get('token');

//   if (!jwt) {
//     return NextResponse.redirect(new URL('/signin', request.url));
//   }

//   try {
// const fetchResponse = await fetch('http://localhost:3001/empresa/verificar-token', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ token: jwt.value }),
// });

//     const data = await fetchResponse.json();

//     if (fetchResponse.status === 200) {
//       const response = NextResponse.next();
//       response.cookies.set('token', data.token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         path: '/',
//       });
//       return response;
//     }

//     const response = NextResponse.redirect(new URL('/signin', request.url));
//     response.cookies.delete('token');
//     return response;

//   } catch (error) {
//     const response = NextResponse.redirect(new URL('/signin', request.url));
//     response.cookies.delete('token');
//     console.error('Error verifying JWT token:', error);
//     return response;
//   }
// }

// export const config = {
//   matcher: [
//     '/((?!registrar|signin).*)',  // Excluye las rutas /registrar y /signin
//     '/dashboard/:path*',          // Incluye todas las rutas bajo /dashboard
//     '/',                          // Incluye la ruta raíz
//   ],
// };
