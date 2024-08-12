import { NextRequest, NextResponse } from 'next/server';
import { axiosInstance } from './config/axios';

export const middleware = async (req: NextRequest) => {
  const response = NextResponse.next();
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    axiosInstance('/prueba')
      .then((data) => console.log('hollaaaa'))
      .catch((error) => console.log('errorrrr'));
  }
  return response;
};
