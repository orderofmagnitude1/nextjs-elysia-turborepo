import { getTranslations } from "next-intl/server";

export const getI18nDataTable = async () => {
	const t = await getTranslations("dataTable");

	return {
		search: {
			search: t("searchOptions.search"),
		},
		filter: {
			resetFilter: t("filterOptions.resetFilter"),
		},
		sort: {
			sort: t("sortOptions.sort"),
			addSort: t("sortOptions.addSort"),
			resetSort: t("sortOptions.resetSort"),
			asc: t("sortOptions.asc"),
			desc: t("sortOptions.desc"),
		},
		columnsToggle: {
			columnsToggle: t("viewOptions.columnsToggle"),
		},
		pagination: {
			rowsPerPage: t("paginationOptions.rowsPerPage"),
			pageOfTotalPages: [
				t("paginationOptions.page"),
				t("paginationOptions.of"),
			] as [string, string],
			startEndRecordOfTotalRecords: ["", "-", "/"] as [string, string, string],
		},
	};
};
