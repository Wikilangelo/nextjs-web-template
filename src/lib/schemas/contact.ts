import { z } from "zod";

export const contactFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Enter at least 2 characters.")
		.max(80, "Use 80 characters or fewer."),
	email: z.email("Enter a valid email address."),
	message: z
		.string()
		.trim()
		.min(20, "Enter at least 20 characters.")
		.max(1000, "Use 1000 characters or fewer."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaults: ContactFormValues = {
	name: "",
	email: "",
	message: "",
};
