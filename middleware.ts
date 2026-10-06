import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PRICE_AB_COOKIE, PRICE_AB_MAX_AGE, assignPriceVariant, isPriceVariant } from '@/lib/pricing-ab';

export function middleware(req: NextRequest) {
  const acceptHeader = req.headers.get('accept') || '';
  
  // If the request accepts text/markdown and is not already an API route
  if (acceptHeader.includes('text/markdown')) {
    const url = req.nextUrl.clone();
    // Save the original path
    const originalPath = url.pathname + url.search;
    
    // Rewrite to our dedicated markdown conversion API route
    url.pathname = '/api/markdown';
    url.searchParams.set('path', originalPath);
    
    return NextResponse.rewrite(url);
  }

  // Assign a sticky price A/B bucket on first visit. Also set it on the incoming
  // request so server components rendering this same request see the variant.
  if (isPriceVariant(req.cookies.get(PRICE_AB_COOKIE)?.value)) {
    return NextResponse.next();
  }
  const variant = assignPriceVariant();
  req.cookies.set(PRICE_AB_COOKIE, variant);
  const res = NextResponse.next({ request: { headers: req.headers } });
  res.cookies.set(PRICE_AB_COOKIE, variant, {
    path: '/',
    maxAge: PRICE_AB_MAX_AGE,
    sameSite: 'lax',
  });
  return res;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
