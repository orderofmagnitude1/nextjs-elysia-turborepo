import { Button, Container, Group, Space } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
	DataTableColumnsToggle,
	type DataTableContextProps,
	DataTableFilter,
	DataTablePagination,
	DataTableSearch,
	DataTableSortList,
} from "mantine-datatable-extended";
import { createDataTableLoader } from "mantine-datatable-extended/server";
import { headers } from "next/headers";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import CustomBreadcrumbs from "@/components/breadcrumbs";
import { getQueryClient } from "@/components/providers/query-provider/create-client";
import { DataTableSkeleton } from "@/components/skeleton";
import { getI18nDataTable } from "@/hooks/i18n-data-table";
import { serverTreaty } from "@/lib/treaty/server";
import { DataTable } from "./(data-table)/table";
import { DataTableWrapper } from "./(data-table)/wrapper";
import FakeDataBtn from "./fake-data-btn";

const loaderProps: Pick<DataTableContextProps, "urlKeys" | "defaultParams"> = {
	defaultParams: {
		sorts: [{ accessor: "createdAt", direction: "desc" }],
	},
};
const loader = createDataTableLoader(loaderProps);

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	const loadedSearchParams = await loader(searchParams);
	const { page, pageSize, sorts, search, filters } = loadedSearchParams;

	const queryClient = getQueryClient();
	queryClient.prefetchQuery({
		queryKey: ["tasks", page, pageSize, sorts, search, filters],
		queryFn: async () => {
			const { data: res } = await serverTreaty.api.todo.task.get({
				query: {
					page: page as number,
					pageSize: pageSize as number,
					sorts: JSON.stringify(sorts),
					search: JSON.stringify(search),
					filters: JSON.stringify(filters),
				},
				headers: await headers(),
			});
			return {
				items: res?.data?.items || [],
				totalRecords: res?.data?.totalRecords || 0,
			};
		},
	});

	const t = await getTranslations("todo");

	return (
		<Container py="xl" size={1440}>
			<CustomBreadcrumbs />
			<Group>
				<Link href={{ pathname: "/todo/create" }}>
					<Button leftSection={<IconPlus />} variant="gradient">
						{t("btnCreate")}
					</Button>
				</Link>
				<FakeDataBtn />
			</Group>
			<Space h="xl" />
			<DataTableWrapper {...loaderProps} storeColumnsKey="todo">
				<DataTableHeader />
				<Space h="md" />
				<HydrationBoundary state={dehydrate(queryClient)}>
					<Suspense fallback={<DataTableSkeleton />}>
						<DataTable />
					</Suspense>
				</HydrationBoundary>
				<Space h="md" />
				<DataTableFooter />
			</DataTableWrapper>
		</Container>
	);
}

export async function DataTableHeader() {
	const { search, filter, sort, columnsToggle } = await getI18nDataTable();
	return (
		<Group justify="space-between">
			<Group>
				<DataTableSearch i18n={search} />
				<DataTableFilter i18n={filter} />
			</Group>
			<Group justify="end">
				<DataTableSortList i18n={sort} />
				<DataTableColumnsToggle i18n={columnsToggle} />
			</Group>
		</Group>
	);
}

export async function DataTableFooter() {
	const { pagination } = await getI18nDataTable();
	return <DataTablePagination i18n={pagination} />;
}
