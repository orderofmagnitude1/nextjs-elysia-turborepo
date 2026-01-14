import { EmailService as LocalEmailService } from "./email.local.service";
import { EmailService as ResendEmailService } from "./email.service";

export const EmailService =
	process.env.NODE_ENV !== "development"
		? ResendEmailService
		: LocalEmailService;
