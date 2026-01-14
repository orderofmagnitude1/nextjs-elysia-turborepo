import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { auth, BetterAuthOpenAPI, TodoController } from "@repo/server";
import { Elysia, t } from "elysia";

const swaggerConfig = new Elysia({ name: "swagger-config" }).use(
	swagger({
		documentation: {
			components: await BetterAuthOpenAPI.components,
			paths: await BetterAuthOpenAPI.getPaths(),
		},
	})
);

export const app = new Elysia({ prefix: "/api" })
	.use(cors())
	.use(swaggerConfig)
	.mount("/auth", auth.handler)
	.get("/", "Hello Nextjs")
	.post("/", ({ body }) => body, {
		body: t.Object({
			name: t.String(),
		}),
	})
	.use(TodoController);

export const GET = app.fetch;
export const POST = app.fetch;

export type AppType = typeof app;
