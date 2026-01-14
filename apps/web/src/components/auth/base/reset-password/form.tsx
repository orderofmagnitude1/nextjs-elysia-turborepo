"use client";

import { Button, Grid, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useFormMessage } from "@/hooks/form-message";
import { useValidateMessage } from "@/hooks/validate-message";
import { authClient } from "@/lib/auth/auth-client";
import { useAuthContext } from "../../provider";

interface IFormSchema {
	password: string;
	passwordConfirmation: string;
}

export default function Form() {
	const authContext = useAuthContext();
	const t = authContext.i18n.resetPassword.form;
	const searchParams = useSearchParams();
	const token = searchParams.get("token") ?? "";
	const v = useValidateMessage();
	const {
		isShowFormMessage,
		FormMessage,
		setInfoFormMessage,
		setErrorFormMessage,
		setSuccessFormMessage,
		clearFormMessage,
	} = useFormMessage();
	const router = useRouter();

	const formSchema = z
		.object({
			password: z.string().min(1, v.required()),
			passwordConfirmation: z.string().min(1, v.required()),
		})
		.refine((data) => data.password === data.passwordConfirmation, {
			message: v.passwordNotMatch(),
			path: ["passwordConfirmation"],
		}) satisfies z.ZodType<IFormSchema>;

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "uncontrolled",
		validate: zod4Resolver(formSchema),
		initialValues: {
			password: "",
			passwordConfirmation: "",
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		clearFormMessage();
		await authClient.resetPassword(
			{
				newPassword: values.password,
				token,
			},
			{
				onRequest: () => {
					setIsSubmitting(true);
					setInfoFormMessage("Resetting password...");
				},
				onError: (_) => {
					setIsSubmitting(false);
					setErrorFormMessage(_.error.message);
				},
				onSuccess: async () => {
					await authClient.revokeSessions();
					setIsSubmitting(false);
					setSuccessFormMessage("Password reset successfully");
					router.push("/auth/sign-in" as Route);
				},
			}
		);
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Grid gutter="md">
				<Grid.Col span={12}>
					<Stack gap="md">
						<PasswordInput
							key={form.key("password")}
							label={t.password.label}
							placeholder={t.password.placeholder}
							withAsterisk
							{...form.getInputProps("password")}
						/>
						<PasswordInput
							key={form.key("passwordConfirmation")}
							label={t.passwordConfirmation.label}
							placeholder={t.passwordConfirmation.placeholder}
							withAsterisk
							{...form.getInputProps("passwordConfirmation")}
						/>
					</Stack>
				</Grid.Col>
				<Grid.Col span={12}>
					<Button
						disabled={isSubmitting}
						fullWidth
						loading={isSubmitting}
						type="submit"
						variant="gradient"
					>
						{t.btnResetPassword}
					</Button>
				</Grid.Col>
				{isShowFormMessage && (
					<Grid.Col span={12}>
						<FormMessage />
					</Grid.Col>
				)}
			</Grid>
		</form>
	);
}
