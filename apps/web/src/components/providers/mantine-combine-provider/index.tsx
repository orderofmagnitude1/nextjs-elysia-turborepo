import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { DateLocalizeProvider } from "../date-locale-provider";

export const MantineCombineProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<MantineProvider defaultColorScheme="auto">
			<Notifications />
			<ModalsProvider>
				<DateLocalizeProvider>{children}</DateLocalizeProvider>
			</ModalsProvider>
		</MantineProvider>
	);
};
