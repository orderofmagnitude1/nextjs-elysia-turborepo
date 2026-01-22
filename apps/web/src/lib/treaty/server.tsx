import { treaty } from "@elysiajs/eden";
import { type AppType, app } from "@/app/api/[[...slugs]]/route";

export const serverTreaty = treaty<AppType>(app, {
	fetch: {
		credentials: "include",
	},
});
