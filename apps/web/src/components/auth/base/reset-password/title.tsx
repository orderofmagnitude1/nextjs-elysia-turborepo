"use client";

import { Stack, Text, Title } from "@mantine/core";
import { useAuthContext } from "../../provider";

export default function AuthTitle() {
	const authContext = useAuthContext();
	const t = authContext.i18n.resetPassword.layout;

	return (
		<Stack gap="4">
			<Title order={2} ta="center">
				{t.title}
			</Title>
			<Text c="dimmed" size="sm" ta="center">
				{t.hint}
			</Text>
		</Stack>
	);
}
