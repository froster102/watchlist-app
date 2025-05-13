import ContentList from "./content-list";

import { getAllTrending } from "@/lib/api/tmdb/services";

export default async function TrendingList() {
  const data = await getAllTrending({ timeWindow: "week" });

  return <ContentList contents={data.results} title="Trending" />;
}
