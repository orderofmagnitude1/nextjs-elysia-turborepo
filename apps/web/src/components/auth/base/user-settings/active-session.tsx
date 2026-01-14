"use client";

import {
	Box,
	Button,
	Card,
	Group,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import { IconDeviceDesktop, IconDeviceMobile } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useMultiInvalidate } from "@/hooks/multi-invalidate";
import { authClient } from "@/lib/auth/auth-client";
import { useAuthContext } from "../../provider";

const mobilePattern =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

export default function UserInfo() {
	const multiInvalidate = useMultiInvalidate();
	const authContext = useAuthContext();
	const t = authContext.i18n.activeSession;
	async function handleRevokeSession(token: string) {
		await authClient.revokeSession(
			{
				token,
			},
			{
				onRequest: () => {
					// TODO: Implement on request
				},
				onError: (_) => {
					// TODO: Implement on error
				},
				onSuccess: async () => {
					await multiInvalidate(["listSessions", "userSession"]);
				},
			}
		);
	}

	const { data: userSession } = useQuery({
		queryKey: ["userSession"],
		queryFn: () => authClient.getSession(),
	});
	const session = userSession?.data?.session ?? null;
	const { data: sessionsData, isLoading } = useQuery({
		queryKey: ["listSessions"],
		queryFn: () => authClient.listSessions(),
	});
	const sessions = sessionsData?.data ?? [];

	const isMobile = (userAgent: string) => {
		if (!userAgent) {
			return false;
		}
		return mobilePattern.test(userAgent);
	};

	return isLoading || sessions.length <= 0 ? null : (
		<Card shadow="xs" withBorder>
			<Card.Section inheritPadding py="xs" withBorder>
				<Text fw={500}>{t.title}</Text>
			</Card.Section>
			<Card.Section inheritPadding py="xs" withBorder>
				<Stack gap="md">
					{sessions.map((s) => (
						<Box key={`session-${s.id}`}>
							<Group justify="space-between">
								<Group>
									<ThemeIcon color="dimmed" size="xs" variant="transparent">
										{isMobile(s.userAgent ?? "Unknown") ? (
											<IconDeviceMobile />
										) : (
											<IconDeviceDesktop />
										)}
									</ThemeIcon>
									<Text size="sm">
										{s.ipAddress ?? "Unknown"}
										{s.token === session?.token ? " (Current session)" : ""}
									</Text>
								</Group>
								<Button
									color="red"
									onClick={() => handleRevokeSession(s.token)}
									variant="outline"
								>
									{t.revoke}
								</Button>
							</Group>
						</Box>
					))}
				</Stack>
			</Card.Section>
		</Card>
	);
}
