import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get('token');
<<<<<<< Updated upstream

  

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
=======
>>>>>>> Stashed changes

  return NextResponse.next();

  // Si el usuario intenta acceder a la ruta '/dashboard'
  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   console.log('JWT', jwt);

<<<<<<< Updated upstream
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
=======
  //   // Si no hay token, redirige a /signin
  //   if (!jwt) {
  //     return NextResponse.redirect(new URL('/signin', request.url));
  //   }

  //   try {
  //     // Valida el token
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ token: jwt.value }),
  //     });

  //     // Verifica si la respuesta es válida y si es JSON
  //     if (!response.ok) {
  //       console.error('La solicitud falló con el estado'+ response);
  //       throw new Error('La solicitud falló con el estado ' + response.status);
  //     }

  //     // Verifica si la respuesta es JSON antes de intentar parsearla
  //     const contentType = response.headers.get('content-type');
  //     if (contentType && contentType.includes('application/json')) {
  //       const data = await response.json();

  //       // Si el token es válido, permite continuar
  //       if (response.status === 200) {
  //         const res = NextResponse.next();
  //         res.cookies.set('token', data.token, {
  //           maxAge: 7 * 24 * 60 * 60, // 7 días
  //           httpOnly: true,
  //           secure: true,
  //           sameSite: 'strict',
  //         });

  //         return res;
  //       }
  //     } else {
  //       console.error('Respuesta no es JSON', contentType);
  //       throw new Error('La respuesta no es JSON');
  //     }

  //     // Si el token no es válido, redirige a /signin
  //     const res = NextResponse.redirect(new URL('/signin', request.url));
  //     res.cookies.delete('token');
  //     return res;
  //   } catch (error) {
  //     console.error('Error en el middleware:', error);
  //     const res = NextResponse.redirect(new URL('/signin', request.url));
  //     res.cookies.delete('token');
  //     return res;
  //   }
  // }

>>>>>>> Stashed changes
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
