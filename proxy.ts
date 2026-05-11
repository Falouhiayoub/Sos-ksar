import { auth } from "@/app/lib/auth";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    const { pathname } = request.nextUrl;

    // 1. Protection Logic
    if (!session) {
        // Redirect to login if trying to access protected routes without a session
        if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/protected") || pathname.startsWith("/command")) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        // 2. Authenticated User Logic
        
        // Redirect away from login if already authenticated
        if (pathname === "/login") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // 3. Role-Based Access Control (RBAC)
        
        // Only admins can access /admin
        if (pathname.startsWith("/admin") && session.user.role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // Only admins and volunteers can access /command
        if (pathname.startsWith("/command") && session.user.role !== "admin" && session.user.role !== "volunteer") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

// 4. Matcher Configuration
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/protected/:path*",
        "/command/:path*",
        "/login",
    ],
};
