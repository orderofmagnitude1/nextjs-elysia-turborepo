import { Elysia } from "elysia";
import { auth } from "./index";

// Create auth middleware
export const authMiddleware = new Elysia({ name: "auth-middleware" })
	.resolve(async ({ request: { headers } }) => {
		const session = await auth.api.getSession({
			headers,
		});
		return {
			user: session?.user,
			session: session?.session,
		};
	})
	.macro({
		checkSession: {
			beforeHandle({ status, session }) {
				if (!session) {
					return status(401, "Unauthorized");
				}
			},
			resolve: ({ user, session }) => {
				return {
					user: user!,
					session: session!,
				};
			},
		},
	})
	.as("scoped");
