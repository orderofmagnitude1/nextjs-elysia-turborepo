"use client";

import {
	Button,
	Card,
	Grid,
	Group,
	Input,
	NumberInput,
	Slider,
	Space,
	TagsInput,
	Textarea,
	TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { z } from "zod";
import FormHeader from "@/components/utils/form-header";
import { useCustomNotification } from "@/hooks/custom-notification";
import { useFormMessage } from "@/hooks/form-message";
import { useMultiInvalidate } from "@/hooks/multi-invalidate";
import { useValidateMessage } from "@/hooks/validate-message";
import { client } from "@/lib/treaty";

type FormSchema = Parameters<typeof client.api.todo.task.post>[0]["data"];

export default function Form() {
	const noti = useCustomNotification();
	const v = useValidateMessage();
	const t = useTranslations("todo.create");
	const multiInvalidate = useMultiInvalidate();
	const { setErrorFormMessage, FormMessage, isShowFormMessage } =
		useFormMessage();
	const router = useRouter();

	const { mutate: createTask, isPending } = useMutation({
		mutationFn: (task: FormSchema) => client.api.todo.task.post({ data: task }),
	});

	const formSchema = z.object({
		title: z.string().min(1, v.required()),
		description: z.string().optional(),
		status: z.enum(["pending", "in_progress", "completed"]),
		priority: z.number().min(1, v.required()),
		estimatedHours: z.number().min(1, v.gte(1)).max(24, v.lte(24)),
		dueDate: z.coerce.date().optional(),
		tags: z.array(z.string()),
	}) satisfies z.ZodType<FormSchema>;

	const form = useForm<z.infer<typeof formSchema>>({
		mode: "uncontrolled",
		validate: zod4Resolver(formSchema),
		initialValues: {
			title: "",
			description: "",
			status: "pending",
			priority: 3,
			estimatedHours: 2,
			dueDate: undefined,
			tags: [],
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		await createTask(values, {
			onSuccess: async ({ response }) => {
				if (response.ok) {
					noti.notifySuccess({
						message: t("successMessage"),
					});
					await multiInvalidate(["tasks"]);
					router.push("/todo" as Route);
				} else {
					setErrorFormMessage(t("errorMessage"));
				}
			},
			onError: (_) => {
				setErrorFormMessage(t("errorMessage"));
			},
		});
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Card shadow="md" withBorder>
				<Card.Section inheritPadding py="md" withBorder>
					<FormHeader
						subtitle={t("form.header.subtitle")}
						title={t("form.header.title")}
					/>
				</Card.Section>
				<Card.Section inheritPadding py="md" withBorder>
					<Grid gutter="md">
						<Grid.Col span={12}>
							<TextInput
								key={form.key("title")}
								label={t("form.title.label")}
								placeholder={t("form.title.placeholder")}
								withAsterisk
								{...form.getInputProps("title")}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 6, md: 2 }}>
							<NumberInput
								key={form.key("priority")}
								label={t("form.priority.label")}
								placeholder={t("form.priority.placeholder")}
								withAsterisk
								{...form.getInputProps("priority")}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 6, md: 4 }}>
							<Input.Wrapper
								label={t("form.estimatedHours.label")}
								withAsterisk
								{...form.getInputProps("estimatedHours")}
							>
								<Space h="md" />
								<Slider
									key={form.key("estimatedHours")}
									{...form.getInputProps("estimatedHours")}
									max={24}
									min={1}
									pb="xl"
									step={1}
								/>
							</Input.Wrapper>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<DatePickerInput
								key={form.key("dueDate")}
								label={t("form.dueDate.label")}
								placeholder={t("form.dueDate.placeholder")}
								{...form.getInputProps("dueDate")}
								clearable
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<Textarea
								key={form.key("description")}
								label={t("form.description.label")}
								placeholder={t("form.description.placeholder")}
								rows={4}
								{...form.getInputProps("description")}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<TagsInput
								key={form.key("tags")}
								label={t("form.tags.label")}
								placeholder={t("form.tags.placeholder")}
								{...form.getInputProps("tags")}
							/>
						</Grid.Col>
					</Grid>
				</Card.Section>
				<Card.Section inheritPadding py="md" withBorder>
					<Group justify="flex-end">
						<Button
							color="gray"
							onClick={() => router.back()}
							variant="outline"
						>
							{t("form.btnCancel")}
						</Button>
						<Button
							disabled={isPending}
							loading={isPending}
							type="submit"
							variant="gradient"
						>
							{t("form.btnCreate")}
						</Button>
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
