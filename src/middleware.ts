import { NextRequest, NextResponse } from "next/server";
import {
  isSupportedLocale,
  LOCALE_COOKIE,
  pickLocale,
} from "@/locale/shared";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Seeds the locale cookie from the browser's Accept-Language header on first
// visit. Once the cookie is set (here or by the in-app switcher) it is the
// source of truth and this is a no-op. The cookie is also written onto the
// current request so the server layout resolves the detected locale on the
// very first render (no wrong-language flash).
export function middleware(request: NextRequest) {
  const existing = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isSupportedLocale(existing)) {
    return NextResponse.next();
  }

  const locale = pickLocale(request.headers.get("accept-language"));
  request.cookies.set(LOCALE_COOKIE, locale);

  const response = NextResponse.next({ request });
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
    sameSite: "lax",
  });
  return response;
}

// Skip API routes, Next internals, and static assets — only page navigations
// need the locale cookie seeded.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
