"use client";

import { Button } from "@mantine/core";
import { IconBrandFacebook } from "@tabler/icons-react";
import { authClient } from "@/lib/auth/auth-client";

export default function FacebookProviderButton() {
	const handleClick = () => {
		authClient.signIn.social({
			provider: "facebook",
			callbackURL: `${window.location.origin}`,
		});
	};
	return (
		<Button
			color="blue"
			onClick={handleClick}
			px="xl"
			size="md"
			variant="outline"
		>
			<IconBrandFacebook size={24} />
		</Button>
	);
}
