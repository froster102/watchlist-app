import ContentList from "./content-list";

import { getPopularContent } from "@/lib/api/tmdb/services";

export default async function PopularMovies() {
  const data = await getPopularContent({ contentType: "movie" });

  return <ContentList contents={data.results} title="Popular movies" />;
}
