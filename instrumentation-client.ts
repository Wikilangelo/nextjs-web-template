import * as Sentry from "@sentry/nextjs";

const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const enableSentry = appEnv === "staging" || appEnv === "production";

const enabled = enableSentry && Boolean(sentryDsn);


Sentry.init({
	dsn: sentryDsn,
	environment: enableSentry ? appEnv : "development",
	enabled,
});
