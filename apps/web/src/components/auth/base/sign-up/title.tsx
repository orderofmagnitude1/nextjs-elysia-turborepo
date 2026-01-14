"use client";

import { Anchor, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useAuthContext } from "../../provider";

export default function AuthTitle() {
	const authContext = useAuthContext();
	const t = authContext.i18n.signUp.layout;

	return (
		<Stack gap="4">
			<Title order={2} ta="center">
				{t.title}
			</Title>
			<Text c="dimmed" size="sm" ta="center">
				{t.haveAccount}{" "}
				<Anchor component={Link} href={{ pathname: "/auth/sign-in" }}>
					<Text c="primary" size="sm" span>
						{t.signIn}
					</Text>
				</Anchor>
			</Text>
		</Stack>
	);
}
