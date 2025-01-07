import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	// Define protected paths
	const isProtectedPath = path.startsWith("/dashboard") || path.startsWith("/create-new-pilot");

	// Define public paths (accessible to unauthenticated users only)
	const isPublicPath = path === "/login" || path === "/register";

	// Get the token from cookies
	const token = request.cookies.get("token")?.value;

	// Redirect unauthenticated users trying to access protected paths
	if (isProtectedPath && !token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// Redirect authenticated users trying to access public paths
	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	// Allow access to all other routes
	return NextResponse.next();
}

// Match the required paths for the middleware
export const config = {
	matcher: ["/dashboard/:path*", "/create-new-pilot/:path*", "/login", "/register"],
};
