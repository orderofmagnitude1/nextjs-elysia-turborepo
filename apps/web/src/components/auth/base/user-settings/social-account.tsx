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
import {
	IconBrandFacebook,
	IconBrandGithub,
	IconBrandGoogle,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useMultiInvalidate } from "@/hooks/multi-invalidate";
import { authClient } from "@/lib/auth/auth-client";
import { useAuthContext } from "../../provider";

const socialProviders = ["google", "facebook", "github"] as const;

export default function SocialAccount() {
	const multiInvalidate = useMultiInvalidate();
	const authContext = useAuthContext();
	const t = authContext.i18n.socialAccounts;
	async function handleLinkAccount(provider: (typeof socialProviders)[number]) {
		await authClient.linkSocial(
			{
				provider,
				callbackURL: `${window.location.href}`,
			},
			{
				onSuccess: async () => {
					await multiInvalidate(["listAccounts"]);
				},
			}
		);
	}

	async function handleUnlinkAccount(provider: string, accountId: string) {
		await authClient.unlinkAccount(
			{
				providerId: provider,
				accountId,
			},
			{
				onSuccess: async () => {
					await multiInvalidate(["listAccounts"]);
				},
			}
		);
	}

	const ProviderIcon = ({ providerId }: { providerId: string }) => {
		switch (providerId) {
			case "google":
				return <IconBrandGoogle />;
			case "facebook":
				return <IconBrandFacebook />;
			case "github":
				return <IconBrandGithub />;
			default:
				return null;
		}
	};

	const { data: accountsData, isLoading } = useQuery({
		queryKey: ["listAccounts"],
		queryFn: () => authClient.listAccounts(),
	});
	const accounts = accountsData?.data ?? [];

	const linkedAccount = (provider: (typeof socialProviders)[number]) => {
		return accounts.find((a) => a.providerId === provider);
	};

	return isLoading || accounts.length <= 0 ? null : (
		<Card shadow="xs" withBorder>
			<Card.Section inheritPadding py="xs" withBorder>
				<Text fw={500}>{t.title}</Text>
			</Card.Section>
			<Card.Section inheritPadding py="xs" withBorder>
				<Stack gap="md">
					{socialProviders.map((a) => (
						<Box key={`provider-${a}`}>
							<Group justify="space-between">
								<Group>
									<ThemeIcon color="dimmed" size="xs" variant="transparent">
										<ProviderIcon providerId={a} />
									</ThemeIcon>
									<Text size="sm">{a}</Text>
								</Group>
								{linkedAccount(a) ? (
									<Button
										color="red"
										onClick={() =>
											handleUnlinkAccount(a, linkedAccount(a)?.accountId ?? "")
										}
										variant="outline"
									>
										{t.btnUnlink}
									</Button>
								) : (
									<Button
										color="green"
										onClick={() => handleLinkAccount(a)}
										variant="outline"
									>
										{t.btnLink}
									</Button>
								)}
							</Group>
						</Box>
					))}
				</Stack>
			</Card.Section>
		</Card>
	);
}
