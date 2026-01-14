import { Card, Stack } from "@mantine/core";
import Form from "./form";
import AuthTitle from "./title";

export default function SignIn() {
	return (
		<Stack gap="xl">
			<AuthTitle />
			<Card radius="md" shadow="sm" withBorder>
				<Form />
			</Card>
		</Stack>
	);
}
