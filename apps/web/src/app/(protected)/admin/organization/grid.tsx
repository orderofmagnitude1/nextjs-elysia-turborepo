"use client";

import {
	Button,
	ButtonGroup,
	Card,
	SimpleGrid,
	Space,
	Text,
	Title,
} from "@mantine/core";
import { IconEdit, IconUsersGroup } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";

export function OrganizationGrid() {
	const { data: organizationsData } = useSuspenseQuery({
		queryKey: ["organizations"],
		queryFn: () => authClient.organization.list(),
	});

	const records = organizationsData?.data ?? [];

	return (
		<SimpleGrid cols={{ base: 1, md: 3 }}>
			{records.map((record) => (
				<Card key={record.id} p="md" shadow="xs" withBorder>
					<Text component={Title} order={3} variant="gradient">
						{record.name}
					</Text>
					<Space h="sm" />
					<Card.Section>
						<ButtonGroup>
							<Button
								color="dark"
								component={Link}
								fullWidth
								href={{ pathname: `/admin/organization/${record.id}` }}
								radius="0"
								variant="subtle"
							>
								<IconEdit size={22} />
							</Button>
							<Button
								color="dark"
								component={Link}
								fullWidth
								href={{ pathname: `/admin/organization/${record.id}/users` }}
								radius="0"
								variant="subtle"
							>
								<IconUsersGroup size={22} />
							</Button>
						</ButtonGroup>
					</Card.Section>
				</Card>
			))}
		</SimpleGrid>
	);
}
