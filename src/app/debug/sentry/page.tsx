import { notFound } from "next/navigation";
import { env } from "@/env/server";
import { SentryDebugClient } from "./sentry-debug-client";

export const dynamic = "force-dynamic";

function isSentryDebugRouteEnabled() {
	return (
		env.APP_ENV === "development" || (env.APP_ENV === "staging" && env.ENABLE_SENTRY_DEBUG_ROUTE)
	);
}

export default function SentryDebugPage() {
	if (!isSentryDebugRouteEnabled()) {
		notFound();
	}

	return <SentryDebugClient appEnv={env.APP_ENV} />;
}
