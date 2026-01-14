"use client";

import {
	Anchor,
	Button,
	Checkbox,
	Flex,
	Grid,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useFormMessage } from "@/hooks/form-message";
import { useValidateMessage } from "@/hooks/validate-message";
import { authClient } from "@/lib/auth/auth-client";
import { useAuthContext } from "../../provider";

interface IFormSchema {
	email: string;
	password: string;
}

export default function Form() {
	const authContext = useAuthContext();
	const t = authContext.i18n.signIn!.form;
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

	const formSchema = z.object({
		email: z.email(v.email()).min(1, v.required()),
		password: z.string().min(1, v.required()),
	}) satisfies z.ZodType<IFormSchema>;

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "uncontrolled",
		validate: zod4Resolver(formSchema),
		initialValues: {
			email: "",
			password: "",
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [isRememberMe, setIsRememberMe] = useState(false);

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		clearFormMessage();
		await authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
				rememberMe: isRememberMe,
				callbackURL: `${window.location.origin}${redirect}`,
			},
			{
				onRequest: () => {
					setIsSubmitting(true);
					setInfoFormMessage("Signing in...");
				},
				onError: (_) => {
					setIsSubmitting(false);
					setErrorFormMessage(_.error.message);
				},
				onSuccess: () => {
					setIsSubmitting(false);
					setSuccessFormMessage("Signed in successfully");
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
						<PasswordInput
							key={form.key("password")}
							label={t.password.label}
							placeholder={t.password.placeholder}
							withAsterisk
							{...form.getInputProps("password")}
						/>
					</Stack>
				</Grid.Col>
				<Grid.Col span={12}>
					<Flex justify="space-between">
						<Checkbox
							checked={isRememberMe}
							label={t.rememberMe}
							onChange={() => setIsRememberMe(!isRememberMe)}
						/>
						<Anchor
							component={Link}
							href={{ pathname: "/auth/forgot-password" }}
						>
							<Text c="primary" size="sm">
								{t.doForgotPassword}
							</Text>
						</Anchor>
					</Flex>
				</Grid.Col>
				<Grid.Col span={12}>
					<Button
						disabled={isSubmitting}
						fullWidth
						loading={isSubmitting}
						type="submit"
						variant="gradient"
					>
						{t.btnSignIn}
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
