import * as Sentry from "@sentry/nextjs";
import { env } from "./src/env/server";

const enableSentry = env.APP_ENV === "staging" || env.APP_ENV === "production";

Sentry.init({
	dsn: env.SENTRY_DSN,
	environment: env.APP_ENV,
	enabled: enableSentry,
});
