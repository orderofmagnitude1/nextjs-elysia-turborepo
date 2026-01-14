"use client";

import { Button, Card, Group, PasswordInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import FlexGrow from "@/components/utils/flex-grow";
import { useFormMessage } from "@/hooks/form-message";
import { useValidateMessage } from "@/hooks/validate-message";
import { authClient } from "@/lib/auth/auth-client";
import { useAuthContext } from "../../provider";

interface IFormSchema {
	currentPassword: string;
	newPassword: string;
	newPasswordConfirmation: string;
}

export default function ChangePassword() {
	const authContext = useAuthContext();
	const t = authContext.i18n.changePassword;
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
			currentPassword: z.string().min(1, v.required()),
			newPassword: z.string().min(1, v.required()),
			newPasswordConfirmation: z.string().min(1, v.required()),
		})
		.refine((data) => data.newPassword === data.newPasswordConfirmation, {
			message: v.passwordNotMatch(),
			path: ["newPasswordConfirmation"],
		}) satisfies z.ZodType<IFormSchema>;

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "uncontrolled",
		validate: zod4Resolver(formSchema),
		initialValues: {
			currentPassword: "",
			newPassword: "",
			newPasswordConfirmation: "",
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		clearFormMessage();
		await authClient.changePassword(
			{
				currentPassword: values.currentPassword,
				newPassword: values.newPassword,
				revokeOtherSessions: true,
			},
			{
				onRequest: () => {
					setIsSubmitting(true);
					setInfoFormMessage("Changing password...");
				},
				onError: (_) => {
					setIsSubmitting(false);
					setErrorFormMessage(_.error.message);
				},
				onSuccess: () => {
					setIsSubmitting(false);
					setSuccessFormMessage("Password changed successfully");
					router.push("/auth/sign-out" as Route);
				},
			}
		);
	}

	const { data: userSession, isLoading } = useQuery({
		queryKey: ["userSession"],
		queryFn: () => authClient.getSession(),
	});
	const user = userSession?.data?.user ?? null;

	return isLoading
		? null
		: user && (
				<Card
					component="form"
					onSubmit={form.onSubmit(handleSubmit)}
					shadow="xs"
					withBorder
				>
					<Card.Section inheritPadding py="xs" withBorder>
						<Text fw={500}>{t.title}</Text>
					</Card.Section>
					<Card.Section inheritPadding py="xs" withBorder>
						<Stack gap="md">
							<PasswordInput
								key={form.key("currentPassword")}
								label={t.currentPassword.label}
								placeholder={t.currentPassword.placeholder}
								withAsterisk
								{...form.getInputProps("currentPassword")}
							/>
							<PasswordInput
								key={form.key("newPassword")}
								label={t.newPassword.label}
								placeholder={t.newPassword.placeholder}
								withAsterisk
								{...form.getInputProps("newPassword")}
							/>
							<PasswordInput
								key={form.key("newPasswordConfirmation")}
								label={t.newPasswordConfirmation.label}
								placeholder={t.newPasswordConfirmation.placeholder}
								withAsterisk
								{...form.getInputProps("newPasswordConfirmation")}
							/>
						</Stack>
					</Card.Section>
					<Card.Section inheritPadding py="xs" withBorder>
						<Group align="flex-end" wrap="nowrap">
							{isShowFormMessage && <FormMessage />}
							<FlexGrow />
							<Button
								disabled={isSubmitting}
								loading={isSubmitting}
								miw="fit-content"
								type="submit"
								variant="gradient"
							>
								{t.btnSave}
							</Button>
						</Group>
					</Card.Section>
				</Card>
			);
}
