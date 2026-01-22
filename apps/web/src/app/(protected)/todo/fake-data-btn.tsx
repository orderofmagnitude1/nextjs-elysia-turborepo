"use client";

import { faker } from "@faker-js/faker";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useCustomNotification } from "@/hooks/custom-notification";
import { useMultiInvalidate } from "@/hooks/multi-invalidate";
import { useValidateMessage } from "@/hooks/validate-message";
import { client } from "@/lib/treaty";

type FormSchema = Parameters<typeof client.api.todo.task.post>[0]["data"];

export default function FakeDataBtn() {
	const noti = useCustomNotification();
	const v = useValidateMessage();
	const multiInvalidate = useMultiInvalidate();
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

	async function handleSubmit() {
		const data: FormSchema[] = Array.from({ length: 10 }, () => ({
			title: faker.lorem.sentence(),
			description: faker.lorem.paragraph(),
			status: faker.helpers.arrayElement([
				"pending",
				"in_progress",
				"completed",
			]),
			priority: faker.number.int({ min: 1, max: 5 }),
			estimatedHours: faker.number.int({ min: 1, max: 24 }),
			dueDate: faker.date.future(),
			tags: faker.lorem.words(3).split(" "),
		}));
		const promises = data.map(async (item) => await createTask(item));
		await Promise.all(promises);
		noti.notifySuccess({
			message: "Create fake data successfully",
		});
		await multiInvalidate(["tasks"]);
		router.refresh();
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Button
				disabled={isPending}
				loading={isPending}
				type="submit"
				variant="gradient"
			>
				Create fake data
			</Button>
		</form>
	);
}
