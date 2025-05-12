import { NextRequest } from "next/server";

import { multiSearch } from "@/lib/api/tmdb/services";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const results = await multiSearch({
    query,
    page,
    includeAdult: true,
    language: "en-US",
  });

  return Response.json(results);
}
