import { NextResponse } from 'next/server';

import {
  defaultLocale,
  locales,
} from './i18n/config';

import type {
  Proxy_Config,
  Proxy_LocalizeRequest_Pathname,
  Proxy_LocalizeRequest_PathnameHasLocale,
  Proxy_LocalizeRequest_Request,
  Proxy_LocalizeRequest_Returns,
  Proxy_LocalizeRequest_Url,
} from './types/proxy.d.ts';

/**
 * Proxy - Config.
 *
 * Runs locale routing for application pages while leaving framework internals
 * and static files untouched.
 *
 * @since 0.0.0
 */
export const config: Proxy_Config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'],
};

/**
 * Proxy - Localize Request.
 *
 * Keeps an existing supported locale route or redirects to the English route.
 * Consumers can add browser-language negotiation when they add more locales.
 *
 * @param {Proxy_LocalizeRequest_Request} request - Request.
 *
 * @returns {Proxy_LocalizeRequest_Returns}
 *
 * @since 0.0.0
 */
function localizeRequest(request: Proxy_LocalizeRequest_Request): Proxy_LocalizeRequest_Returns {
  const pathname: Proxy_LocalizeRequest_Pathname = request.nextUrl.pathname;
  const pathnameHasLocale: Proxy_LocalizeRequest_PathnameHasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (pathnameHasLocale === true) {
    return NextResponse.next();
  }

  const url: Proxy_LocalizeRequest_Url = request.nextUrl.clone();

  url.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(url);
}

export default localizeRequest;
