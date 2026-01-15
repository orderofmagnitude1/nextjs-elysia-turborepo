export * from "./auth";
export * from "./todo";

import {
	account,
	invitation,
	member,
	organization,
	session,
	team,
	teamMember,
	user,
	verification,
} from "./auth";
import { task } from "./todo";

export const table = {
	user,
	account,
	session,
	verification,
	organization,
	team,
	teamMember,
	invitation,
	member,

	task,
} as const;

export type Table = typeof table;
