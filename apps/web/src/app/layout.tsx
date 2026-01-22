import "../index.css";
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "mantine-datatable/styles.layer.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type React from "react";
import { MantineCombineProvider } from "@/components/providers/mantine-combine-provider";
import QueryProvider from "@/components/providers/query-provider";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
	title: "NextJS Elysia",
	description: "NextJS Elysia",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = await getLocale();
	return (
		<html lang={locale} {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript defaultColorScheme="auto" />
			</head>
			<body>
				<NuqsAdapter>
					<QueryProvider>
						<NextIntlClientProvider>
							<MantineCombineProvider>{children}</MantineCombineProvider>
						</NextIntlClientProvider>
					</QueryProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
