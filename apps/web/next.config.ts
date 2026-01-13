import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	experimental: {
		optimizePackageImports: [
			"@mantine/core",
			"@mantine/hooks",
			"@mantine/dates",
			"@mantine/form",
			"@mantine/notifications",
			"@mantine/modals",
			"@mantine/dropzone",
		],
	},
};

export default withNextIntl(nextConfig);
