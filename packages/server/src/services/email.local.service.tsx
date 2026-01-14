import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import {
	LinkForgotPassword,
	LinkVerifyEmail,
	OTPForgotPassword,
	OTPVerifyEmail,
} from "../emails";

export abstract class EmailService {
	private static readonly provider = nodemailer.createTransport({
		host: "localhost",
		port: 1025,
	});
	private static readonly companyName = "HQCodeLab";
	private static readonly fromEmail =
		`${this.companyName} <noreply@email.hoaaq.dev>`;

	static async sendLinkVerifyEmail({ to, url }: { to: string; url: string }) {
		const emailHtml = await render(<LinkVerifyEmail url={url} />);

		await EmailService.provider.sendMail({
			from: EmailService.fromEmail,
			to,
			subject: "Xác thực địa chỉ email của bạn",
			html: emailHtml,
		});
	}

	static async sendLinkForgotPasswordEmail({
		to,
		url,
	}: {
		to: string;
		url: string;
	}) {
		const emailHtml = await render(<LinkForgotPassword url={url} />);

		await EmailService.provider.sendMail({
			from: EmailService.fromEmail,
			to,
			subject: "Khôi phục mật khẩu",
			html: emailHtml,
		});
	}

	static async sendSignUpVerificationEmail({
		to,
		otp,
	}: {
		to: string;
		otp: string;
	}) {
		const emailHtml = await render(<OTPVerifyEmail otp={otp} />);

		await EmailService.provider.sendMail({
			from: EmailService.fromEmail,
			to,
			subject: "Xác thực địa chỉ email của bạn",
			html: emailHtml,
		});
	}

	static async sendForgotPasswordEmail({
		to,
		otp,
	}: {
		to: string;
		otp: string;
	}) {
		const emailHtml = await render(<OTPForgotPassword otp={otp} />);

		await EmailService.provider.sendMail({
			from: EmailService.fromEmail,
			to,
			subject: "Khôi phục mật khẩu",
			html: emailHtml,
		});
	}
}
