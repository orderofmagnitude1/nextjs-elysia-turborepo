"use client";

import {
	type MantineColorScheme,
	SegmentedControl,
	ThemeIcon,
	useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun, IconSunMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ThemeSegmentor() {
	const { setColorScheme, colorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	function onThemeChange(value: MantineColorScheme) {
		setColorScheme(value);
	}

	const themeOptions = [
		{
			label: (
				<ThemeIcon color="dimmed" size="xs" variant="transparent">
					<IconSun size={14} />
				</ThemeIcon>
			),
			value: "light",
		},
		{
			label: (
				<ThemeIcon color="dimmed" size="xs" variant="transparent">
					<IconMoon size={14} />
				</ThemeIcon>
			),
			value: "dark",
		},
		{
			label: (
				<ThemeIcon color="dimmed" size="xs" variant="transparent">
					<IconSunMoon size={14} />
				</ThemeIcon>
			),
			value: "auto",
		},
	];

	const [shouldRender, setShouldRender] = useState(false);
	useEffect(() => {
		setShouldRender(true);
	}, []);

	return (
		shouldRender && (
			<SegmentedControl
				data={themeOptions}
				onChange={(value) => onThemeChange(value as MantineColorScheme)}
				value={colorScheme}
				withItemsBorders={false}
			/>
		)
	);
}
