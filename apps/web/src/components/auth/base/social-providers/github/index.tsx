"use client";

import { Button } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { authClient } from "@/lib/auth/auth-client";

export default function GithubProviderButton() {
	const handleClick = () => {
		authClient.signIn.social({
			provider: "github",
			callbackURL: `${window.location.origin}`,
		});
	};
	return (
		<Button
			color="gray"
			onClick={handleClick}
			px="xl"
			size="md"
			variant="outline"
		>
			<IconBrandGithub size={24} />
		</Button>
	);
}
