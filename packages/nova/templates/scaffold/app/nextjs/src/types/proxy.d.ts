import type {
  NextRequest,
  NextResponse,
} from 'next/server';

/**
 * Proxy - Config.
 *
 * @since 0.0.0
 */
export type Proxy_Config_Matcher = string[];

export type Proxy_Config = {
  matcher: Proxy_Config_Matcher;
};

/**
 * Proxy - Localize Request.
 *
 * @since 0.0.0
 */
export type Proxy_LocalizeRequest_Request = NextRequest;

export type Proxy_LocalizeRequest_Returns = NextResponse;

export type Proxy_LocalizeRequest_Pathname = string;

export type Proxy_LocalizeRequest_PathnameHasLocale = boolean;

export type Proxy_LocalizeRequest_Url = NextRequest['nextUrl'];
