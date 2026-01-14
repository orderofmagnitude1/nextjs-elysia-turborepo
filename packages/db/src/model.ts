import { table } from "./schema";
import { spreads } from "./spread-db";

export const dbModel = {
	insert: spreads(
		{
			user: table.user,
			task: table.task,
		},
		"insert"
	),
	select: spreads(
		{
			user: table.user,
			task: table.task,
		},
		"select"
	),
} as const;
