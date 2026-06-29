import { z } from "zod";

type ContactValidationMessages = {
	nameMin: string;
	nameMax: string;
	emailInvalid: string;
	messageMin: string;
	messageMax: string;
};

const fallbackMessages: ContactValidationMessages = {
	nameMin: "Enter at least 2 characters.",
	nameMax: "Use 80 characters or fewer.",
	emailInvalid: "Enter a valid email address.",
	messageMin: "Enter at least 20 characters.",
	messageMax: "Use 1000 characters or fewer.",
};

export function createContactFormSchema(messages: ContactValidationMessages = fallbackMessages) {
	return z.object({
		name: z.string().trim().min(2, messages.nameMin).max(80, messages.nameMax),
		email: z.email(messages.emailInvalid),
		message: z.string().trim().min(20, messages.messageMin).max(1000, messages.messageMax),
	});
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

export const contactFormDefaults: ContactFormValues = {
	name: "",
	email: "",
	message: "",
};
