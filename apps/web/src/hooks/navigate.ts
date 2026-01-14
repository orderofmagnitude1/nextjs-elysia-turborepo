"use client";

import { IconBuilding, IconList } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export const useNavigations = () => {
	const t = useTranslations("navigation");
	const adminNavs = [
		{
			href: "/todo",
			title: t("todo"),
			icon: IconList,
		},
		{
			href: "/admin/organization",
			title: t("admin.organization"),
			icon: IconBuilding,
		},
	];
	return {
		adminNavs,
	};
};
