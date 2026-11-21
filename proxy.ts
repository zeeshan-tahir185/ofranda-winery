import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/lib/content";

const translated: readonly string[] = ["en"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((code) => translated.includes(code));

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred ?? "en"}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|media|favicon.ico|.*\\..*).*)"],
};
