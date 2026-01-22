"use client";

import { Badge } from "@mantine/core";
import { useDataTableColumns } from "mantine-datatable";
import {
	type DataTableContextProps,
	type DataTableExtendedColumnProps,
	DataTableProvider,
} from "mantine-datatable-extended";
import { useTranslations } from "next-intl";
import { useDateFormatter } from "@/hooks/date-format";
import type { client } from "@/lib/treaty";

export type Task = NonNullable<
	Awaited<ReturnType<(typeof client)["api"]["todo"]["task"]["get"]>>["data"]
>["data"]["items"][number];

type DataTableWrapperProps = {
	children: React.ReactNode;
} & Omit<
	DataTableContextProps<Task>,
	"columns" | "originalUseDataTableColumnsResult"
>;

export function DataTableWrapper({
	children,
	...props
}: DataTableWrapperProps) {
	const dateFormatter = useDateFormatter();
	const t = useTranslations("todo.dataTable");

	const getStatusBadge = (
		status: Task["status"]
	): { color: string; label: string } => {
		switch (status) {
			case "completed":
				return { color: "green", label: t("enum.status.completed") };
			case "in_progress":
				return { color: "blue", label: t("enum.status.in_progress") };
			default:
				return { color: "yellow", label: t("enum.status.pending") };
		}
	};

	const columns: DataTableExtendedColumnProps<Task>[] = [
		{
			accessor: "code",
			title: t("code"),
			draggable: true,
			toggleable: true,
			width: "0%",
			textAlign: "center",
			extend: {
				searchable: true,
				sortable: true,
				filterable: true,
				filterVariant: "text",
			},
		},
		{
			accessor: "title",
			title: t("title"),
			draggable: true,
			toggleable: true,
			extend: {
				searchable: true,
				sortable: true,
				filterable: true,
				filterVariant: "text",
			},
		},
		{
			accessor: "priority",
			title: t("priority"),
			draggable: true,
			toggleable: true,
			width: "0%",
			textAlign: "center",
			extend: {
				sortable: true,
				filterable: true,
				filterVariant: "number",
			},
		},
		{
			accessor: "estimatedHours",
			title: t("estimatedHours"),
			draggable: true,
			toggleable: true,
			width: "0%",
			textAlign: "center",
			extend: {
				sortable: true,
				filterable: true,
				filterVariant: "number_range",
				filterOptions: {
					min: 1,
					max: 24,
					step: 1,
					minRange: 1,
				},
			},
		},
		{
			accessor: "dueDate",
			title: t("dueDate"),
			render: (record) =>
				record.dueDate ? dateFormatter(record.dueDate, "dd/MM/yyyy") : "-",
			draggable: true,
			toggleable: true,
			width: "0%",
			textAlign: "center",
			extend: {
				sortable: true,
				filterable: true,
				filterVariant: "date_range",
			},
		},
		{
			accessor: "status",
			title: t("status"),
			draggable: true,
			toggleable: true,
			width: "0%",
			textAlign: "center",
			extend: {
				sortable: true,
				filterable: true,
				filterVariant: "single_select",
				filterOptions: {
					data: [
						{ label: t("enum.status.pending"), value: "pending" },
						{ label: t("enum.status.completed"), value: "completed" },
						{ label: t("enum.status.in_progress"), value: "in_progress" },
					],
				},
			},
			render: (record) => {
				const { color, label } = getStatusBadge(record.status);
				return (
					<Badge color={color} size="sm">
						{label}
					</Badge>
				);
			},
		},
		{
			accessor: "createdAt",
			title: t("createdAt"),
			render: (record) => dateFormatter(record.createdAt, "dd/MM/yyyy"),
			draggable: true,
			toggleable: true,
			width: "0%",
			textAlign: "center",
			extend: {
				sortable: true,
				filterable: true,
				filterVariant: "date",
			},
		},
	];

	const originalUseDataTableColumnsResult = useDataTableColumns({
		key: props.storeColumnsKey,
		columns,
	});

	return (
		<DataTableProvider
			{...props}
			columns={columns}
			originalUseDataTableColumnsResult={originalUseDataTableColumnsResult}
		>
			{children}
		</DataTableProvider>
	);
}
