import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove: (name, options) => {
          res.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  try {
    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Protected routes - redirect to login if no session
    const protectedPaths = ["/dashboard", "/profile", "/settings"];

    const isProtectedPath = protectedPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath && !session) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Handle post-login redirect
    if (request.nextUrl.pathname === "/auth/login" && session) {
      const redirectTo = request.nextUrl.searchParams.get("redirectTo") || "/";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    // Update response cookies
    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    return res;
  }
}
