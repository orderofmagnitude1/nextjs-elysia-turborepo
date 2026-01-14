import { db } from "@repo/db";
import { betterAuth, type Path } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, openAPI, organization } from "better-auth/plugins";
import { EmailService } from "../services";
import {
	createSessionHookHandler,
	createUserHookHandler,
} from "./hook-handlers";

// Initialize Better Auth with Drizzle
export const auth = betterAuth({
	trustedOrigins: [],
	basePath: "/api",
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "facebook", "github"],
		},
	},
	socialProviders: {
		google: {
			prompt: "select_account",
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			redirectURI: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/api/callback/google`,
		},
		facebook: {
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
			redirectURI: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/api/callback/facebook`,
		},
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			redirectURI: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/api/callback/github`,
		},
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			const replacedUrl = url.replace("/api/", "/api/auth/api/");
			await EmailService.sendLinkForgotPasswordEmail({
				to: user.email,
				url: replacedUrl,
			});
		},
	},
	emailVerification: {
		sendOnSignIn: true,
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 600,
		sendVerificationEmail: async ({ user, url }) => {
			const replacedUrl = url.replace("/api/", "/api/auth/api/");
			await EmailService.sendLinkVerifyEmail({
				to: user.email,
				url: replacedUrl,
			});
		},
	},
	plugins: [
		admin(),
		organization({
			teams: {
				enabled: true,
			},
		}),
		openAPI({ disableDefaultReference: true }),
	],
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					await createUserHookHandler(user);
				},
			},
		},
		session: {
			create: {
				before: async (session) => {
					return await createSessionHookHandler(session);
				},
			},
		},
	},
	advanced:
		process.env.NODE_ENV === "production" &&
		process.env.BETTER_AUTH_COOKIES_CROSSDOMAIN
			? {
					crossSubDomainCookies: {
						enabled: true,
						domain: process.env.BETTER_AUTH_COOKIES_CROSSDOMAIN as string,
					},
					defaultCookieAttributes: {
						partitioned: true,
						secure: true,
						httpOnly: true,
						sameSite: "none",
					},
				}
			: undefined,
});

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
// biome-ignore lint/suspicious/noAssignInExpressions: noreason
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());
export const BetterAuthOpenAPI = {
	getPaths: (prefix = "/api/auth/api") =>
		getSchema().then(({ paths }) => {
			const reference: typeof paths = Object.create(null);

			for (const path of Object.keys(paths)) {
				const key = prefix + path;
				reference[key] = paths[path] as Path;

				for (const method of Object.keys(paths[path] as Path)) {
					// biome-ignore lint/suspicious/noExplicitAny: noreason
					const operation = (reference[key] as any)[method];

					operation.tags = ["Better Auth"];
				}
			}

			return reference;
			// biome-ignore lint/suspicious/noExplicitAny: noreason
		}) as Promise<any>,
	// biome-ignore lint/suspicious/noExplicitAny: noreason
	components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;
