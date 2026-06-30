import { z } from "zod";

const sentryBuildEnvSchema = z.object({
	SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
	SENTRY_ORG: z.string().min(1).optional(),
	SENTRY_PROJECT: z.string().min(1).optional(),
});

const parsedSentryBuildEnv = sentryBuildEnvSchema.safeParse({
	SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
	SENTRY_ORG: process.env.SENTRY_ORG,
	SENTRY_PROJECT: process.env.SENTRY_PROJECT,
});

if (!parsedSentryBuildEnv.success) {
	throw new Error(
		`Invalid Sentry build environment variables: ${parsedSentryBuildEnv.error.message}`,
	);
}

export const sentryBuildEnv = parsedSentryBuildEnv.data;
