"use client";

import { SegmentedControl } from "@mantine/core";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LocaleSegmentor() {
	const [locale, setLocale] = useState<string>("vi");
	const router = useRouter();

	const localeOptions = [
		{
			label: "EN",
			value: "en",
		},
		{
			label: "VI",
			value: "vi",
		},
	];

	useEffect(() => {
		setLocale(Cookies.get("NEXT_LOCALE") ?? "vi");
	}, []);

	const onLocaleChange = (value: string) => {
		Cookies.set("NEXT_LOCALE", value);
		setLocale(value);
		router.refresh();
	};

	return (
		<SegmentedControl
			data={localeOptions}
			onChange={(value) => onLocaleChange(value)}
			value={locale}
			withItemsBorders={false}
		/>
	);
}
