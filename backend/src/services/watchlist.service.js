import { Watchlist } from '../model/index.js'
import ApiError from '../utils/ApiError.js'
import tmdbClient from '../utils/tmdbClient.js'
import httpStatus from 'http-status'

/**
 * Get watchlist by id
 * @param {string} watchlistId 
 * @returns {Promise<Watchlist>}
 */
export const getWatchlistById = async (watchlistId) => {
    const watchlist = await Watchlist.findById(watchlistId)
    return watchlist
}

/**
 * Create watchlist for the user id
 * @param {string} userId 
 * @returns {Promise<Watchlist>}
 */
export const createWatchlist = async (userId) => {
    const watchlist = await Watchlist.create({
        userId
    })
    return watchlist
}

/**
 * Get watchlist id from user id
 * @param {string} userId 
 * @returns {ObjectId}
 */
export const getWatchlistIdByUserId = async (userId) => {
    const watchlist = await Watchlist.findOne({ userId })
    if (!watchlist) {
        const watchlist = await createWatchlist(userId)
        return watchlist._id
    }
    return watchlist._id
}

/**
 * Remove movie from watchlist
 * @param {string} watchlistId 
 * @param {string} movieId
 * @returns {Promise<Watchlist>} 
 */
export const removeMovieFromWatchlist = async (watchlistId, movieId) => {
    const watchlist = await getWatchlistById(watchlistId)
    const foundMovieIndex = watchlist.movies.findIndex(movie => movie.tmdbMovieId === movieId)
    if (foundMovieIndex === -1) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found in watchlist')
    }
    watchlist.movies.splice(foundMovieIndex, 1)
    await watchlist.save()
    console.log(watchlist)
    return watchlist
}

/**
 * Add movie to the watchlist
 * @param {string} movieId 
 * @param {string} userId 
 * @returns {Promise<Watchlist>}
 */
export const addMovieToWatchlist = async (movieId, watchlistId) => {
    const watchlist = await getWatchlistById(watchlistId)
    const { data } = await tmdbClient.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`)
    const {
        id: tmdbMovieId,
        poster_path: thumbnail,
        title: movieTitle,
        overview: description,
        vote_average: rating,
    } = data
    const movieDetails = { tmdbMovieId, thumbnail, movieTitle, description, rating }
    watchlist.movies.push(movieDetails)
    await watchlist.save()
    return watchlist
}