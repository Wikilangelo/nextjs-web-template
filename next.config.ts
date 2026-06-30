import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { sentryBuildEnv } from "./src/env/sentry-build";
import { env } from "./src/env/server";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const enableSentryInBrowser = env.APP_ENV !== "development";
const enableSentrySourceMapsUpload = Boolean(sentryBuildEnv.SENTRY_AUTH_TOKEN);

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_APP_ENV: env.APP_ENV,
		NEXT_PUBLIC_SENTRY_DSN: enableSentryInBrowser ? env.SENTRY_DSN : "",
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
};

export default withSentryConfig(withNextIntl(nextConfig), {
	silent: true,
	telemetry: false,
	sourcemaps: {
		disable: !enableSentrySourceMapsUpload,
		deleteSourcemapsAfterUpload: true,
	},
	webpack: {
		treeshake: {
			removeDebugLogging: true,
		},
	},
	suppressOnRouterTransitionStartWarning: true,
	errorHandler: (error) => {
		console.warn("Sentry source maps upload failed; continuing build.", error);
	},
	org: sentryBuildEnv.SENTRY_ORG,
	project: sentryBuildEnv.SENTRY_PROJECT,
	authToken: sentryBuildEnv.SENTRY_AUTH_TOKEN,
});
