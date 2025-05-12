import ContentList from "./content-list";

import { getPopularContent } from "@/lib/api/tmdb/services";

export default async function PopularShows() {
  const data = await getPopularContent({ contentType: "tv" });

  return <ContentList contents={data.results} title="Popular shows" />;
}
