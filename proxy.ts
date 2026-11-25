import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/lib/content";

const translated: readonly string[] = locales;

const preferredLocale = (request: NextRequest) => {
  const header = request.headers.get("accept-language") ?? "";
  const match = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((code) => translated.includes(code));
  return match ?? "en";
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const qr = pathname.match(/^\/w\/([a-z0-9-]+)\/?$/);
  if (qr) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request)}/wines/${qr[1]}`;
    return NextResponse.redirect(url, 307);
  }

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|admin|api|media|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\..*).*)"],
};
