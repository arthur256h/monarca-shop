import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_EMAIL = "admin@monarca.com";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Só protege rotas /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Cookie do usuário (você precisa salvar isso no login)
  const userCookie = request.cookies.get("user");

  if (!userCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const user = JSON.parse(userCookie.value);

    if (user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

/* ===================== CONFIG ===================== */

export const config = {
  matcher: ["/admin/:path*"],
};
