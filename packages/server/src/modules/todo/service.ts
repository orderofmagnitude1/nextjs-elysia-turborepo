import { db, table } from "@repo/db";
import { createQueryBuilder } from "@repo/db/find-many-query-builder";
import { count } from "drizzle-orm";
import { generateId } from "../../utils/gen-id";
import type { StaticQueryParamsType, taskModel } from "./model";

export abstract class TodoService {
	static async createOneTask({
		data,
		userId,
	}: {
		data: typeof taskModel.create.static;
		userId: string;
	}): Promise<typeof taskModel.entity.static> {
		const task = await db
			.insert(table.task)
			.values({
				...data,
				id: generateId(),
				createdById: userId,
				updatedById: userId,
			})
			.returning();
		return task[0]!;
	}
	static async getManyTasks({
		query,
	}: {
		query: StaticQueryParamsType;
	}): Promise<{
		items: (typeof taskModel.entity.static)[];
		totalRecords: number;
	}> {
		// Count query (with filters applied)
		const countQuery = db
			.select({ count: count() })
			.from(table.task)
			.$dynamic();

		// Base query with dynamic filters
		const baseQuery = db.select().from(table.task).$dynamic();

		// Apply query params using query builder (type-safe)
		const finalQuery = createQueryBuilder(baseQuery, table.task)
			.applyParams(query)
			.build();
		const finalCountQuery = createQueryBuilder(countQuery, table.task)
			.applyParams(query, true)
			.build();

		const [total, tasks] = await Promise.all([finalCountQuery, finalQuery]);

		return {
			items: tasks,
			totalRecords: total[0]?.count || 0,
		};
	}
}
