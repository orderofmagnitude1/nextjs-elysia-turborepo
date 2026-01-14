import { Resend } from "resend";
import {
	LinkForgotPassword,
	LinkVerifyEmail,
	OTPForgotPassword,
	OTPVerifyEmail,
} from "../emails";

export abstract class EmailService {
	private static readonly resend = new Resend(process.env.RESEND_API_KEY);
	private static readonly companyName = "HQCodeLab";
	private static readonly fromEmail =
		`${this.companyName} <noreply@email.hoaaq.dev>`;

	static async sendLinkVerifyEmail({ to, url }: { to: string; url: string }) {
		await EmailService.resend.emails.send({
			from: EmailService.fromEmail,
			to,
			subject: "Xác thực địa chỉ email của bạn",
			react: <LinkVerifyEmail url={url} />,
		});
	}

	static async sendLinkForgotPasswordEmail({
		to,
		url,
	}: {
		to: string;
		url: string;
	}) {
		await EmailService.resend.emails.send({
			from: EmailService.fromEmail,
			to,
			subject: "Khôi phục mật khẩu",
			react: <LinkForgotPassword url={url} />,
		});
	}

	static async sendSignUpVerificationEmail({
		to,
		otp,
	}: {
		to: string;
		otp: string;
	}) {
		await EmailService.resend.emails.send({
			from: EmailService.fromEmail,
			to,
			subject: "Xác thực địa chỉ email của bạn",
			react: <OTPVerifyEmail otp={otp} />,
		});
	}

	static async sendForgotPasswordEmail({
		to,
		otp,
	}: {
		to: string;
		otp: string;
	}) {
		await EmailService.resend.emails.send({
			from: EmailService.fromEmail,
			to,
			subject: "Khôi phục mật khẩu",
			react: <OTPForgotPassword otp={otp} />,
		});
	}
}
