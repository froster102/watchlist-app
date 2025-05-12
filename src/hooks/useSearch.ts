import { useInfiniteQuery } from "@tanstack/react-query";

import { search } from "@/app/services/search";

export const useSearch = ({
  query,
  enabled = true,
}: {
  query: string;
  enabled: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: [query],
    queryFn: ({ pageParam }) => search({ query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.page > 1 ? firstPage.page - 1 : undefined;
    },
    enabled,
  });
};
