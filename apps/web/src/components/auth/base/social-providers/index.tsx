"use client";

import { Divider, Group } from "@mantine/core";
import { useAuthContext } from "../../provider";
import FacebookProviderButton from "./facebook";
import GithubProviderButton from "./github";
import GoogleProviderButton from "./google";

export default function SocialProviders() {
	const authContext = useAuthContext();
	const t = authContext.i18n.socialProviders;
	return (
		<>
			<Divider label={t.orContinueWith} py="md" />
			<Group gap="xs" justify="center">
				<GoogleProviderButton />
				<FacebookProviderButton />
				<GithubProviderButton />
			</Group>
		</>
	);
}
