"use client";

import {
	Button,
	Checkbox,
	Grid,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
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
	name: string;
	email: string;
	password: string;
}

export default function Form() {
	const authContext = useAuthContext();
	const t = authContext.i18n.signUp.form;
	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirect") ?? "";
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
			name: z.string().min(1, v.required()),
			email: z.email(v.email()).min(1, v.required()),
			password: z.string().min(1, v.required()),
			passwordConfirmation: z.string().min(1, v.required()),
			agreeToTerms: z.boolean(),
		})
		.refine((data) => data.password === data.passwordConfirmation, {
			message: v.passwordNotMatch(),
			path: ["passwordConfirmation"],
		})
		.refine((data) => data.agreeToTerms === true, {
			message: v.agreeTerm(),
			path: ["agreeToTerms"],
		}) satisfies z.ZodType<IFormSchema>;

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "uncontrolled",
		validate: zod4Resolver(formSchema),
		initialValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			agreeToTerms: false,
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		clearFormMessage();
		await authClient.signUp.email(
			{
				name: values.name,
				email: values.email,
				password: values.password,
				callbackURL: `${window.location.origin}${redirect}`,
			},
			{
				onRequest: () => {
					setIsSubmitting(true);
					setInfoFormMessage("Signing up...");
				},
				onError: (_) => {
					setIsSubmitting(false);
					setErrorFormMessage(_.error.message);
				},
				onSuccess: () => {
					setIsSubmitting(false);
					setSuccessFormMessage("Signed up successfully");
					router.push(`/auth/sign-in?redirect=${redirect}` as Route);
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
							key={form.key("name")}
							label={t.name.label}
							placeholder={t.name.placeholder}
							withAsterisk
							{...form.getInputProps("name")}
						/>
						<TextInput
							key={form.key("email")}
							label={t.email.label}
							placeholder={t.email.placeholder}
							withAsterisk
							{...form.getInputProps("email")}
						/>
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
					<Checkbox
						key={form.key("agreeToTerms")}
						label={
							<Text c="dimmed" size="sm">
								{t.agreeToTerms}
							</Text>
						}
						{...form.getInputProps("agreeToTerms")}
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Button
						disabled={isSubmitting}
						fullWidth
						loading={isSubmitting}
						type="submit"
						variant="gradient"
					>
						{t.btnSignUp}
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
