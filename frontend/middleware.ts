import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/checkout');

    // Redirect to login if accessing a protected route without a token
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect to home if accessing an auth page while already logged in
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Specify routes to run middleware on
    matcher: ['/profile/:path*', '/checkout/:path*', '/login', '/register'],
};
