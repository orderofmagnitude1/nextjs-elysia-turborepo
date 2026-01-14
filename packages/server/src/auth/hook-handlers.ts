import { db, table } from "@repo/db";
import type { Session, User } from "better-auth";
import { eq } from "drizzle-orm";
import { generateId } from "../utils/gen-id";

export const createUserHookHandler = async (user: User) => {
	const organization = await db.query.organization.findFirst({
		where: eq(
			table.organization.slug,
			process.env.DEFAULT_ORGANIZATION_SLUG as string
		),
	});
	if (organization) {
		await db.insert(table.member).values({
			id: generateId(),
			organizationId: organization.id,
			userId: user.id,
			role: "member",
			createdAt: new Date(),
		});
	} else {
		const [organization] = await db
			.insert(table.organization)
			.values({
				id: generateId(),
				name: "Default Organization",
				slug: process.env.DEFAULT_ORGANIZATION_SLUG as string,
				createdAt: new Date(),
			})
			.returning();

		await db.insert(table.member).values({
			id: generateId(),
			organizationId: organization!.id,
			userId: user.id,
			role: "owner",
			createdAt: new Date(),
		});
	}
};

export const createSessionHookHandler = async (session: Session) => {
	const organization = await db.query.organization.findFirst({
		with: {
			members: {
				where: eq(table.member.userId, session.userId),
			},
		},
	});
	return {
		data: {
			...session,
			activeOrganizationId: organization?.id,
		},
	};
};
