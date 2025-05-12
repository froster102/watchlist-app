import axios from "axios";

export const search = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const response = await axios.get<TmdbSearchResponse>(
    `api/search?query=${query}&page=${page}`,
  );

  return response.data;
};
