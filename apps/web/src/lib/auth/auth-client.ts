import { adminClient, organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	basePath: "/api/auth/api",
	plugins: [adminClient(), organizationClient({ teams: { enabled: true } })],
});
