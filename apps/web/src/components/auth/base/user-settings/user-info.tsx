"use client";

import { Button, Card, Group, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";
import { z } from "zod";
import FlexGrow from "@/components/utils/flex-grow";
import { useFormMessage } from "@/hooks/form-message";
import { useMultiInvalidate } from "@/hooks/multi-invalidate";
import { useValidateMessage } from "@/hooks/validate-message";
import { authClient } from "@/lib/auth/auth-client";
import { useAuthContext } from "../../provider";

interface IFormSchema {
	name: string;
}

export default function UserInfo() {
	const authContext = useAuthContext();
	const t = authContext.i18n.userInfo;
	const v = useValidateMessage();
	const {
		isShowFormMessage,
		FormMessage,
		setInfoFormMessage,
		setErrorFormMessage,
		setSuccessFormMessage,
		clearFormMessage,
	} = useFormMessage();
	const multiInvalidate = useMultiInvalidate();

	const formSchema = z.object({
		name: z.string().min(1, v.required()),
	}) satisfies z.ZodType<IFormSchema>;

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "uncontrolled",
		validate: zod4Resolver(formSchema),
		initialValues: {
			name: "",
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		clearFormMessage();
		await authClient.updateUser(
			{
				name: values.name.trim(),
			},
			{
				onRequest: () => {
					setIsSubmitting(true);
					setInfoFormMessage("Updating user info...");
				},
				onError: (_) => {
					setIsSubmitting(false);
					setErrorFormMessage(_.error.message);
				},
				onSuccess: async () => {
					await multiInvalidate(["userSession"]);
					setIsSubmitting(false);
					setSuccessFormMessage("User info updated successfully");
				},
			}
		);
	}

	const { data: userSession, isLoading } = useQuery({
		queryKey: ["userSession"],
		queryFn: () => authClient.getSession(),
	});
	const user = userSession?.data?.user ?? null;

	useEffect(() => {
		if (user) {
			form.setValues({
				name: user.name,
			});
		}
	}, [user, form.setValues]);

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
							<TextInput
								defaultValue={user.email}
								disabled
								label={t.email.label}
								placeholder={t.email.placeholder}
								readOnly
								withAsterisk
							/>
							<TextInput
								key={form.key("name")}
								label={t.name.label}
								placeholder={t.name.placeholder}
								withAsterisk
								{...form.getInputProps("name")}
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
