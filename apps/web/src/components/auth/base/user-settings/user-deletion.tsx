"use client";

import { Button, Card, Group, Modal, Space, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useMultiInvalidate } from "@/hooks/multi-invalidate";
import { authClient } from "@/lib/auth/auth-client";
import { useAuthContext } from "../../provider";

function DeletionConfirmationModal() {
	const authContext = useAuthContext();
	const t = authContext.i18n.userDeletion.modal;
	const [opened, { open, close }] = useDisclosure(false);
	const multiInvalidate = useMultiInvalidate();
	const router = useRouter();

	async function handleDeleteAccount() {
		await authClient.deleteUser(
			{},
			{
				onSuccess: async () => {
					await multiInvalidate(["userSession"]);
					close();
					router.push("/");
				},
			}
		);
	}

	return (
		<>
			<Modal
				centered
				onClose={close}
				opened={opened}
				title={
					<Text c="red" fw={500}>
						{t.title}
					</Text>
				}
			>
				<Text>{t.description}</Text>
				<Space h="md" />
				<Group justify="flex-end">
					<Button color="default" onClick={close} variant="outline">
						{t.cancel}
					</Button>
					<Button color="red" onClick={handleDeleteAccount} variant="outline">
						{t.confirm}
					</Button>
				</Group>
			</Modal>
			<Button color="red" onClick={open} variant="outline">
				{t.btnDelete}
			</Button>
		</>
	);
}

export default function UserDeletion() {
	const authContext = useAuthContext();
	const t = authContext.i18n.userDeletion;
	return (
		<Card shadow="xs" withBorder>
			<Card.Section inheritPadding py="xs" withBorder>
				<Text fw={500}>{t.title}</Text>
			</Card.Section>
			<Card.Section inheritPadding py="xs" withBorder>
				<Text size="sm">{t.description}</Text>
				<Space h="md" />
				<Group justify="flex-end">
					<DeletionConfirmationModal />
				</Group>
			</Card.Section>
		</Card>
	);
}
