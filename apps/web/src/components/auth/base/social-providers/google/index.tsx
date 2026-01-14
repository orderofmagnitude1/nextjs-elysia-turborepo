"use client";

import { Button } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";
import { authClient } from "@/lib/auth/auth-client";

export default function GoogleProviderButton() {
	const handleClick = () => {
		authClient.signIn.social({
			provider: "google",
			callbackURL: `${window.location.origin}`,
		});
	};
	return (
		<Button
			color="green"
			onClick={handleClick}
			px="xl"
			size="md"
			variant="outline"
		>
			<IconBrandGoogle size={24} />
		</Button>
	);
}
