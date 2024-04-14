import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nextIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/navigation';

const intlMiddleware = (request: NextRequest) =>
  Promise.resolve(
    nextIntlMiddleware({
      localePrefix: 'as-needed',
      defaultLocale,
      locales,
    })(request),
  );

export default async function middleware(request: NextRequest) {
  request.headers.set('x-pathname', request.nextUrl.pathname);
  const intlResponse = await intlMiddleware(request);
  return intlResponse ? intlResponse : NextResponse.next();
}
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
