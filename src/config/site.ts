import { siteEnv } from "@/env/site";

export const siteConfig = {
	name: "Hello Next.js Template",
	description:
		"Reusable Next.js template for customer websites and applications with forms, internationalization, authentication, and production-ready defaults.",
	url: siteEnv.NEXT_PUBLIC_SITE_URL ? new URL(siteEnv.NEXT_PUBLIC_SITE_URL) : undefined,
};
