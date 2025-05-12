declare global {
  export type TmdbSearchResponse = {
    page: number;
    results: {
      adult: boolean;
      backdrop_path: string;
      id: number;
      title: string;
      original_language: string;
      original_title: string;
      overview: string;
      poster_path: string;
      media_type: "tv" | "movie" | "person";
      genre_ids: number[];
      popularity: number;
      release_date: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }[];
    total_pages: number;
    total_results: number;
  };

  export type Content = TmdbSearchResponse["results"][0];
}

export {};
