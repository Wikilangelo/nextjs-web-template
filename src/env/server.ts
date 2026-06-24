import { z } from "zod";

const serverEnvSchema = z.object({
	DATABASE_URL: z.url(),
});

const parsedServerEnv = serverEnvSchema.safeParse({
	DATABASE_URL: process.env.DATABASE_URL,
});

if (!parsedServerEnv.success) {
	throw new Error(`Invalid server environment variables: ${parsedServerEnv.error.message}`);
}

export const env = parsedServerEnv.data;
