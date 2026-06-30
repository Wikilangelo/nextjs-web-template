import { z } from "zod";

const siteEnvSchema = z.object({
	NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

const parsedSiteEnv = siteEnvSchema.safeParse({
	NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsedSiteEnv.success) {
	throw new Error(`Invalid site environment variables: ${parsedSiteEnv.error.message}`);
}

export const siteEnv = parsedSiteEnv.data;
