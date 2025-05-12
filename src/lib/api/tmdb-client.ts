import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
const accessToken = process.env.TMDB_API_KEY;

export const tmdbClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
