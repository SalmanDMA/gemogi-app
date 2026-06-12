import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/orders', '/profile'];
const authRoutes = ['/login', '/register'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((r) => path.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => path.startsWith(r));

  const token = req.cookies.get('accessToken')?.value;

  if (isProtectedRoute && !token) {
    const url = new URL('/login', req.nextUrl);
    url.searchParams.set('redirectTo', path);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$).*)'],
};
