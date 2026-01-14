"use client";

import {
	Button,
	Card,
	Fieldset,
	Grid,
	Group,
	Stack,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowRight } from "@tabler/icons-react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import type { Route } from "next";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { z } from "zod";
import { useCustomNotification } from "@/hooks/custom-notification";
import { useFormMessage } from "@/hooks/form-message";
import { useMultiInvalidate } from "@/hooks/multi-invalidate";
import { useValidateMessage } from "@/hooks/validate-message";
import { authClient } from "@/lib/auth/auth-client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const func = authClient.organization.update;
type FormSchema = Parameters<typeof func>[0]["data"];

export default function Form({
	isUpdateState = false,
}: {
	isUpdateState?: boolean;
}) {
	const v = useValidateMessage();
	const t = useTranslations("admin.organization.form");
	const multiInvalidate = useMultiInvalidate();
	const router = useRouter();
	const { setErrorFormMessage, FormMessage, isShowFormMessage } =
		useFormMessage();
	const { notifySuccess } = useCustomNotification();

	const { id } = useParams();
	const itemId = id as string;
	const { data: organizationData } = useSuspenseQuery({
		queryKey: ["organization", itemId],
		queryFn: () =>
			authClient.organization.getFullOrganization({
				query: { organizationId: itemId, membersLimit: 1 },
			}),
	});
	const record = organizationData?.data;

	const { mutate: updateOrganization, isPending } = useMutation({
		mutationFn: (organization: FormSchema) =>
			authClient.organization.update({
				data: organization,
				organizationId: itemId,
			}),
	});

	const formSchema = z.object({
		name: z.string().min(1, v.required()),
		slug: z.string().min(1, v.required()),
		logo: z.string().optional(),
		metadata: z.record(z.string(), z.string()).optional(),
	}) satisfies z.ZodType<FormSchema>;

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "uncontrolled",
		validate: zod4Resolver(formSchema),
		initialValues: {
			name: "",
			slug: "",
			logo: "",
			metadata: undefined,
		},
	});

	useEffect(() => {
		if (record) {
			form.setValues({
				name: record.name ?? "",
				slug: record.slug ?? "",
				logo: record.logo ?? "",
				metadata: record.metadata ? JSON.parse(record.metadata) : undefined,
			});
		}
	}, [record, form.setValues]);

	useEffect(() => {
		return () => {
			form.reset();
		};
	}, [form.reset]);

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		await updateOrganization(values, {
			onSuccess: async ({ error }) => {
				if (error) {
					setErrorFormMessage(
						t("errorMessage", { error: error.message ?? "" })
					);
				} else {
					notifySuccess({ message: t("successMessage") });
					await multiInvalidate(["organizations", "organization", itemId]);
					router.push(`/admin/organization/${itemId}` as Route);
				}
			},
			onError: (_) => {
				setErrorFormMessage(t("errorMessage", { error: _.message ?? "" }));
			},
		});
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Card shadow="md" withBorder>
				<Card.Section inheritPadding py="md" withBorder>
					<Grid gutter="md">
						<Grid.Col span={12}>
							<Fieldset>
								<Stack>
									<TextInput
										key={form.key("slug")}
										label={t("slug")}
										placeholder={t("slug")}
										withAsterisk={isUpdateState}
										{...form.getInputProps("slug")}
										disabled={isUpdateState}
										readOnly
									/>
									<TextInput
										key={form.key("name")}
										label={t("name")}
										placeholder={t("name")}
										withAsterisk={isUpdateState}
										{...form.getInputProps("name")}
										readOnly={!isUpdateState}
									/>
								</Stack>
							</Fieldset>
						</Grid.Col>
					</Grid>
				</Card.Section>
				<Card.Section inheritPadding py="md" withBorder>
					<Group justify="flex-end">
						{isUpdateState ? (
							<>
								<Button
									color="red"
									component={Link}
									href={{ pathname: `/admin/organization/${itemId}` }}
									variant="outline"
								>
									{t("btnCancel")}
								</Button>
								<Button
									disabled={isPending}
									loading={isPending}
									type="submit"
									variant="gradient"
								>
									{t("btnSave")}
								</Button>
							</>
						) : (
							<Button
								color="blue"
								component={Link}
								href={{ pathname: `/admin/organization/${itemId}/update` }}
								rightSection={<IconArrowRight size={16} />}
								variant="outline"
							>
								{t("btnUpdate")}
							</Button>
						)}
					</Group>
				</Card.Section>
				{isShowFormMessage && (
					<Card.Section inheritPadding py="md" withBorder>
						<FormMessage />
					</Card.Section>
				)}
			</Card>
		</form>
	);
}
