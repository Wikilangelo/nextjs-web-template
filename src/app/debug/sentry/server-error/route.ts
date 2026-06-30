import { env } from "@/env/server";

export const dynamic = "force-dynamic";

function isSentryDebugRouteEnabled() {
	return (
		env.APP_ENV === "development" || (env.APP_ENV === "staging" && env.ENABLE_SENTRY_DEBUG_ROUTE)
	);
}

export function GET() {
	if (!isSentryDebugRouteEnabled()) {
		return new Response("Not found", { status: 404 });
	}

	throw new Error("Sentry debug server error");
}
