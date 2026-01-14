import { Affix, Container, Flex, Group } from "@mantine/core";
import LocaleSegmentor from "@/components/theme-control/locale-segmentor";
import ThemeSegmentor from "@/components/theme-control/theme-segmentor";

export default function BaseAuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Flex align="center" justify="center" mih="100dvh">
			<Affix position={{ top: 20, right: 20 }}>
				<Group gap="xs">
					<ThemeSegmentor />
					<LocaleSegmentor />
				</Group>
			</Affix>
			<Container size="lg">{children}</Container>
		</Flex>
	);
}
