import { defaultLocale, locales } from '@/navigation';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import nextIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { protectedRoutes } from './config/app';

const intlMiddleware = (request: NextRequest) =>
  Promise.resolve(
    nextIntlMiddleware({
      localePrefix: 'as-needed',
      defaultLocale,
      locales,
      localeDetection: false,
    })(request),
  );

async function middleware(request: NextRequestWithAuth) {
  const { pathname } = request.nextUrl;
  request.headers.set('x-pathname', pathname);

  if (pathname.startsWith(process.env.NEXT_PUBLIC_GATEWAY_URL)) {
    const token = request.nextauth.token;

    if (token?.accessToken) {
      request.headers.set('Authorization', `Bearer ${token?.accessToken}`);
    }

    return NextResponse.rewrite(
      new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}`),
      {
        headers: request.headers,
      },
    );
  }

  const intlResponse = await intlMiddleware(request);
  const response = intlResponse ? intlResponse : NextResponse.next();

  return response;
}

const withAuthMiddleware = withAuth(middleware, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (
        protectedRoutes.some((route) => req.nextUrl.pathname.includes(route))
      ) {
        return !!token;
      }
      return true;
    },
  },
});

export default withAuthMiddleware;

export const config = {
  matcher: [
    /**
     * It matches all paths except:
     * 1. /api/ (includes trpc there)
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (OG tags proxying)
     * 4. /_vercel (Vercel internals)
     * 5. /_static (inside of /public)
     * 6. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     * 7. The paths containing a file extension (e.g., .jpg, .png, etc.)
     */
    '/((?!api/|_next/|_proxy/|_vercel|_static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
