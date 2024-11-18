import tmdbClient from "../utils/tmdbClient.js";

/**
 * Search for a movie from a keyword
 * @param {string} keyword 
 * @returns {object}
 */
export const searchMovies = async (keyword) => {
  const response = await tmdbClient.get(`/search/movie?query=${keyword}`)
  const results = response.data.results
  return results
}
