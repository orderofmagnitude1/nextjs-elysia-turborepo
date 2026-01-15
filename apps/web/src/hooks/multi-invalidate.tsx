"use client";

import { useQueryClient } from "@tanstack/react-query";

export const useMultiInvalidate = () => {
	const queryClient = useQueryClient();

	return (queryKeys: string[]) => {
		return queryClient.invalidateQueries({
			predicate: (query) =>
				query.queryKey.every((key) => queryKeys.includes(key as string)),
		});
	};
};
