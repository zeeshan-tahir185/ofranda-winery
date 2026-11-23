import { NextResponse, type NextRequest } from "next/server";
import { locales, wines } from "@/lib/content";

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
    const wine = wines.find((w) => w.slug === qr[1] && !w.soon);
    const url = request.nextUrl.clone();
    url.pathname = wine ? `/${preferredLocale(request)}/wines/${wine.slug}` : `/${preferredLocale(request)}`;
    return NextResponse.redirect(url, 307);
  }

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|media|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\..*).*)"],
};
