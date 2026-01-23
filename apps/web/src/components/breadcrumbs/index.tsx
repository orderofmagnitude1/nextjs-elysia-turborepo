"use client";

import {
	ActionIcon,
	Anchor,
	Breadcrumbs,
	Divider,
	Group,
	Text,
	VisuallyHidden,
} from "@mantine/core";
import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface CustomBreadcrumbsProps {
	key: string;
	title: string;
	href: string;
	isHidden?: boolean;
}

const keysHidden = ["admin", "auth"];

export default function CustomBreadcrumbs() {
	const t = useTranslations("breadcrumbs");

	const translate = (key: string) => {
		if (t.has(key)) {
			return t(key);
		}
		return key;
	};

	const pathname = usePathname();

	const [breadcrumbs, setBreadcrumbs] = useState<CustomBreadcrumbsProps[]>([]);
	const [backHref, setBackHref] = useState<string>("");

	// biome-ignore lint/correctness/useExhaustiveDependencies: should effect on t change
	useEffect(() => {
		const pathParts = pathname.split("/").filter(Boolean);

		const breads = pathParts.map((part, index) => ({
			key: part,
			title: translate(part),
			href: `/${pathParts.slice(0, index + 1).join("/")}`,
			isHidden: keysHidden.includes(part),
		}));
		setBreadcrumbs(breads);

		const backBreadcrumb = breads.at(-2);
		setBackHref(
			keysHidden.includes(backBreadcrumb?.key ?? "")
				? ""
				: backBreadcrumb?.href || ""
		);
	}, [pathname, t]);

	return (
		<>
			<Group align="center" gap={0}>
				{backHref && (
					<ActionIcon
						c="blue"
						component={Link}
						href={{ pathname: backHref }}
						size="sm"
						variant="subtle"
					>
						<IconArrowLeft size={16} />
					</ActionIcon>
				)}
				<Breadcrumbs
					separator={<IconChevronRight size={14} />}
					separatorMargin={4}
				>
					{breadcrumbs.map((breadcrumb, idx) =>
						idx === breadcrumbs.length - 1 ? (
							<Text fz="sm" key={breadcrumb.key}>
								{breadcrumb.title}
							</Text>
						) : (
							<Anchor
								c="blue"
								component={Link}
								fz="sm"
								href={{ pathname: breadcrumb.href }}
								key={breadcrumb.key}
								underline="hover"
							>
								{breadcrumb.isHidden ? (
									<VisuallyHidden>{breadcrumb.title}</VisuallyHidden>
								) : (
									breadcrumb.title
								)}
							</Anchor>
						)
					)}
				</Breadcrumbs>
			</Group>
			<Divider my="md" />
		</>
	);
}
