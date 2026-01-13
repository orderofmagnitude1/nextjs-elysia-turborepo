"use client";

import { DatesProvider } from "@mantine/dates";
import { useLocale } from "next-intl";

import "dayjs/locale/vi";
import "dayjs/locale/en";

export function DateLocalizeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = useLocale();
	return <DatesProvider settings={{ locale }}>{children}</DatesProvider>;
}
