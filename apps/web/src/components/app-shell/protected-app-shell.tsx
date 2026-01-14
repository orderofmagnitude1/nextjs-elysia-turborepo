"use client";

import {
	AppShell,
	Box,
	Burger,
	Group,
	LoadingOverlay,
	NavLink,
	Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavigations } from "@/hooks/navigate";
import { authClient } from "@/lib/auth/auth-client";
import AuthView from "../auth";
import Logo from "../logo";
import LanguageSegmentor from "../theme-control/locale-segmentor";
import ThemeSegmentor from "../theme-control/theme-segmentor";
import FlexGrow from "../utils/flex-grow";

export default function ProtectedAppShell({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isLoading } = useQuery({
		queryKey: ["userSession"],
		queryFn: () => authClient.getSession(),
	});

	const [opened, { toggle, close }] = useDisclosure();
	const { adminNavs } = useNavigations();
	const pathname = usePathname();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 280,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md">
					<Burger hiddenFrom="sm" onClick={toggle} opened={opened} size="sm" />
					<Box visibleFrom="sm">
						<Link href="/" style={{ textDecoration: "none" }}>
							<Logo />
						</Link>
					</Box>
					<FlexGrow />
					<Group gap="xs">
						<ThemeSegmentor />
						<LanguageSegmentor />
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p="md">
				<AppShell.Section>
					<Box hiddenFrom="sm">
						<Link href="/" style={{ textDecoration: "none" }}>
							<Logo />
						</Link>
						<Space h="md" />
					</Box>
				</AppShell.Section>
				<AppShell.Section grow>
					{adminNavs.map((navigation) => (
						<NavLink
							active={pathname.includes(navigation.href)}
							component={Link}
							href={{ pathname: navigation.href }}
							key={navigation.href}
							label={navigation.title}
							leftSection={<navigation.icon />}
							onClick={() => close()}
							variant="light"
						/>
					))}
				</AppShell.Section>
				<AppShell.Section>
					<Group justify="center">
						<AuthView path="user-button-menu" />
					</Group>
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main pos="relative">
				<LoadingOverlay
					loaderProps={{ type: "bars" }}
					transitionProps={{ transition: "fade", duration: 300 }}
					visible={isLoading}
				/>
				{!isLoading && children}
			</AppShell.Main>
		</AppShell>
	);
}
