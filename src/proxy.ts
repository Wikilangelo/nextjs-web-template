import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/debug")) {
		return NextResponse.next();
	}

	// In Next.js 16, proxy rewrites re-enter the proxy (unlike Next.js 15).
	// next-intl sets X-NEXT-INTL-LOCALE on the rewritten request headers.
	// Without this guard, "/" rewrites to "/it", which then redirects back
	// to "/" → infinite redirect loop.
	if (request.headers.has("X-NEXT-INTL-LOCALE")) {
		return NextResponse.next();
	}
	return intlMiddleware(request);
}

export const config = {
	matcher: [
		// Match all pathnames except Next.js internals and static files
		"/((?!_next|_vercel|.*\\..*).*)",
		// Always match the root
		"/",
	],
};
