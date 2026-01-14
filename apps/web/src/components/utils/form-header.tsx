import { Stack, Text, Title } from "@mantine/core";

export default function FormHeader({
	title,
	subtitle,
}: {
	title: string;
	subtitle?: string;
}) {
	return (
		<Stack gap={4}>
			<Text component={Title} order={3} variant="gradient">
				{title}
			</Text>
			{subtitle && (
				<Text c="dimmed" size="sm">
					{subtitle}
				</Text>
			)}
		</Stack>
	);
}
