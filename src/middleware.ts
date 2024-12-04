import { defaultLocale, locales } from '@/navigation';
import { withAuth } from 'next-auth/middleware';
import nextIntlMiddleware from 'next-intl/middleware';
import { cookies } from 'next/headers';
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

const middleware = withAuth(
  async function middleware(request) {
    request.headers.set('x-pathname', request.nextUrl.pathname);

    const intlResponse = await intlMiddleware(request);
    const response = intlResponse ? intlResponse : NextResponse.next();

    const key = process.env.NEXT_PUBLIC_WOOCOMMERCE_SESSION_KEY!;
    let wooSession = cookies().get(key)?.value;
    if (!wooSession) {
      wooSession =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5uZXh0d29vLmlyIiwiaWF0IjoxNzMyOTUyMTMzLCJuYmYiOjE3MzI5NTIxMzMsImV4cCI6MTczNDE2MTczMywiZGF0YSI6eyJjdXN0b21lcl9pZCI6InRfYzNiOGYwNGVjODY2OTA4NDIzZGQ1ZDBjN2Q4NDY1In19.o8zBDgQHokzPwuNpXZvEZVFi8Pcc5KbqWwB9n3Zpw84';
      response.cookies.set(key, wooSession, {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    request.headers.set(key, wooSession);
    return response;
  },
  {
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
  },
);

export default middleware;

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
