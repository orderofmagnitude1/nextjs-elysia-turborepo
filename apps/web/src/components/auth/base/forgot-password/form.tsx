"use client";

import { Button, Grid, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { z } from "zod";
import { useFormMessage } from "@/hooks/form-message";
import { useValidateMessage } from "@/hooks/validate-message";
import { authClient } from "@/lib/auth/auth-client";
import { useAuthContext } from "../../provider";

interface IFormSchema {
	email: string;
}

export default function Form() {
	const authContext = useAuthContext();
	const t = authContext.i18n.forgotPassword.form;
	const v = useValidateMessage();
	const {
		isShowFormMessage,
		FormMessage,
		setInfoFormMessage,
		setErrorFormMessage,
		setSuccessFormMessage,
		clearFormMessage,
	} = useFormMessage();

	const formSchema = z.object({
		email: z.email(v.email()).min(1, v.required()),
	}) satisfies z.ZodType<IFormSchema>;

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "uncontrolled",
		validate: zod4Resolver(formSchema),
		initialValues: {
			email: "",
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		clearFormMessage();
		await authClient.requestPasswordReset(
			{
				email: values.email,
				redirectTo: `${window.location.origin}/auth/reset-password`,
			},
			{
				onRequest: () => {
					setIsSubmitting(true);
					setInfoFormMessage("Sending reset link...");
				},
				onError: (_) => {
					setIsSubmitting(false);
					setErrorFormMessage(_.error.message);
				},
				onSuccess: () => {
					setIsSubmitting(false);
					setSuccessFormMessage("Reset link sent successfully");
				},
			}
		);
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Grid gutter="md">
				<Grid.Col span={12}>
					<Stack gap="md">
						<TextInput
							key={form.key("email")}
							label={t.email.label}
							placeholder={t.email.placeholder}
							withAsterisk
							{...form.getInputProps("email")}
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
						{t.btnSendResetLink}
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
