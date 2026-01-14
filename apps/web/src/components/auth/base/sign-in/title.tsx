"use client";

import { Anchor, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useAuthContext } from "../../provider";

export default function AuthTitle() {
	const authContext = useAuthContext();
	const t = authContext.i18n.signIn.layout;

	return (
		<Stack gap="4">
			<Title order={2} ta="center">
				{t.title}
			</Title>
			<Text c="dimmed" size="sm" ta="center">
				{t.doNotHaveAccountYet}{" "}
				<Anchor component={Link} href={{ pathname: "/auth/sign-up" }}>
					<Text c="primary" size="sm" span>
						{t.createAccount}
					</Text>
				</Anchor>
			</Text>
		</Stack>
	);
}
