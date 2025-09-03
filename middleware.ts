// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("keepli-session");
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));
  if (isProtected && !session) {
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
