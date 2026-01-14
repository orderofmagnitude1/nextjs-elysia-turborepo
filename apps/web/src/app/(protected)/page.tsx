import { Text } from "@mantine/core";
import { auth } from "@repo/server";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
	const userSession = await auth.api.getSession({
		headers: await headers(),
	});
	return userSession?.user ? (
		<Text>Hello {userSession.user.name}</Text>
	) : (
		<Link href={{ pathname: "/auth/sign-in" }}>Sign In</Link>
	);
}
