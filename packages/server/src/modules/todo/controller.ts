import { Elysia, t } from "elysia";
import { authMiddleware } from "../../auth/middleware";
import {
	queryParamsElysiaModel,
	type StaticQueryParamsType,
	taskModel,
} from "./model";
import { TodoService } from "./service";

const createOneTask = new Elysia({ name: "create-one-task" })
	.use(authMiddleware)
	.post(
		"/task",
		async ({ body, user }) => {
			const task = await TodoService.createOneTask({
				data: body.data,
				userId: user.id,
			});
			return {
				data: task,
			};
		},
		{
			checkSession: true,
			body: t.Object({
				data: taskModel.create,
			}),
			response: t.Object({
				data: taskModel.entity,
			}),
			tags: ["Todo"],
		}
	);

const getManyTasks = new Elysia({ name: "get-many-tasks" })
	.use(authMiddleware)
	.get(
		"/task",
		async ({ query }) => {
			const { items, totalRecords } = await TodoService.getManyTasks({
				query: query as unknown as StaticQueryParamsType,
			});
			return {
				data: {
					items,
					totalRecords,
				},
			};
		},
		{
			checkSession: true,
			query: queryParamsElysiaModel,
			response: t.Object({
				data: t.Object({
					items: t.Array(taskModel.entity),
					totalRecords: t.Number(),
				}),
			}),
			tags: ["Todo"],
		}
	);

export const TodoController = new Elysia({
	name: "todo-controller",
	prefix: "/todo",
})
	.use(createOneTask)
	.use(getManyTasks);
