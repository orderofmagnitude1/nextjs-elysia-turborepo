"use client";

import {
	Avatar,
	Button,
	Group,
	Menu,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import { IconLogout, IconSelector, IconUser } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";
import { useAuthContext } from "../../provider";

export default function UserButtonMenu() {
	const authContext = useAuthContext();
	const t = authContext.i18n.userButtonMenu;
	const { data: userSession, isLoading } = useQuery({
		queryKey: ["userSession"],
		queryFn: () => authClient.getSession(),
	});

	const user = userSession?.data?.user ?? null;

	return isLoading || !user ? null : (
		<Menu offset={2} position="top" width="target">
			<Menu.Target>
				<Button
					bd="1px solid var(--mantine-color-default-border)"
					color="dark"
					h={48}
					px="xs"
					variant="outline"
				>
					<Group gap="xs" justify="space-between" wrap="nowrap">
						<Avatar color="initials" name={user.name} src={user.image} />
						<Stack align="flex-start" gap="0">
							<Text fw={500} size="xs">
								{user.name}
							</Text>
							<Text c="dimmed" size="xs">
								{user.email}
							</Text>
						</Stack>
						<ThemeIcon color="dark" size="xs" variant="transparent">
							<IconSelector size={14} />
						</ThemeIcon>
					</Group>
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item
					component={Link}
					href={{ pathname: "/auth/user-settings" }}
					leftSection={<IconUser size={16} />}
				>
					{t.userSettings}
				</Menu.Item>
				<Menu.Item
					color="red"
					component={Link}
					href={{ pathname: "/auth/sign-out" }}
					leftSection={<IconLogout size={16} />}
				>
					{t.signOut}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
