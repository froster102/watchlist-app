import { watchlistService } from '../services/index.js'
import { searchMovies } from '../services/tmdb.service.js'
import ApiError from '../utils/ApiError.js'
import catchAsync from '../utils/catchAsync.js'
import httpStatus from 'http-status'

export const getWatchlist = catchAsync(async (req, res) => {
    const user = req.user
    const watchlistId = await watchlistService.getWatchlistIdByUserId(user._id)
    const watchlist = await watchlistService.getWatchlistById(watchlistId)
    return res.status(httpStatus.OK).json(watchlist)
})

export const addToWatchlist = catchAsync(async (req, res) => {
    const { movieId } = req.body
    const user = req.user
    const watchlistId = await watchlistService.getWatchlistIdByUserId(user._id)
    if (!watchlistId) {
        throw new ApiError(httpStatus.NOT_FOUND, `Watchlist with ${watchlistId} not found`)
    }
    const watchlist = await watchlistService.addMovieToWatchlist(movieId, watchlistId)
    return res.status(httpStatus.OK).json({ watchlist })
})

export const removeFromWatchlist = catchAsync(async (req, res) => {
    const { movieId } = req.params
    const userId = req.user
})

export const searchMovie = catchAsync(async (req, res) => {
    const { query } = req.query
    const results = await searchMovies(query)
    return res.status(httpStatus.OK).json({ results })
})