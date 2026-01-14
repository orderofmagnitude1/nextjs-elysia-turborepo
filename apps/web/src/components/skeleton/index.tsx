import {
	Card,
	Divider,
	Fieldset,
	SimpleGrid,
	Skeleton,
	Stack,
} from "@mantine/core";

export const SkeletonHeader = () => {
	return (
		<Stack gap="xs">
			<Skeleton height={28} maw={200} />
			<Skeleton height={24} maw={300} />
		</Stack>
	);
};

export const SkeletonCard = () => {
	return (
		<Card p="md" radius="md" shadow="md" withBorder>
			<Stack gap="lg">
				<Stack gap="xs">
					<Skeleton height={28} maw={50} />
					<Skeleton height={24} maw={100} />
				</Stack>
				<Divider />
				<Skeleton height={100} />
			</Stack>
		</Card>
	);
};

export const SkeletonForm = () => {
	return (
		<Stack gap="xs">
			<SkeletonHeader />
			<Fieldset>
				<Stack gap="md">
					<Stack gap="xs">
						<Skeleton height={20} maw={100} />
						<Skeleton height={32} />
					</Stack>
					<Stack gap="xs">
						<Skeleton height={20} maw={100} />
						<Skeleton height={32} />
					</Stack>
				</Stack>
			</Fieldset>
			<Fieldset>
				<Stack gap="md">
					<Stack gap="xs">
						<Skeleton height={20} maw={100} />
						<Skeleton height={32} />
					</Stack>
					<Stack gap="xs">
						<Skeleton height={20} maw={100} />
						<Skeleton height={32} />
					</Stack>
				</Stack>
			</Fieldset>
			<Skeleton height={24} />
		</Stack>
	);
};

export function SkeletonPage() {
	return (
		<Stack gap="lg">
			<SkeletonHeader />
			<SimpleGrid cols={{ base: 1, md: 3 }}>
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</SimpleGrid>
		</Stack>
	);
}
