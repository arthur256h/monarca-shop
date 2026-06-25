import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_EMAIL = "admin@monarca.com";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔹 Só protege rotas /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const userCookie = request.cookies.get("user");

  // 🔹 Se não tem cookie → bloqueia
  if (!userCookie?.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const user = JSON.parse(decodeURIComponent(userCookie.value));

    // 🔹 Verifica admin
    if (user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
