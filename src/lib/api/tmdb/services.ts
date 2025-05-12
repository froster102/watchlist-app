import "server-only";

import { tmdbClient } from "@/lib/api/tmdb-client";

export const multiSearch = async ({
  query = "",
  page = "1",
  includeAdult = false,
  language = "en-US",
}: {
  query: string;
  page: string;
  includeAdult: boolean;
  language: string;
}) => {
  const response = await tmdbClient.get<TmdbSearchResponse>(
    `/search/multi?query=${query}&include_adult=${includeAdult}&language=${language}&page=${page}`,
  );

  return response.data;
};

export const getAllTrending = async ({
  timeWindow,
}: {
  timeWindow: "day" | "week";
}) => {
  const response = await tmdbClient.get<TmdbSearchResponse>(
    `/trending/all/${timeWindow}`,
  );

  return response.data;
};

export const getPopularContent = async ({
  language = "en-US",
  page = 1,
  contentType,
}: {
  language?: string;
  page?: number;
  region?: string;
  contentType: "movie" | "tv";
}) => {
  const response = await tmdbClient.get<TmdbSearchResponse>(
    `/${contentType}/popular?language=${language}&page=${page}`,
  );

  return response.data;
};
