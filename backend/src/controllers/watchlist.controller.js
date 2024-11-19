import { watchlistService } from '../services/index.js'
import { searchMovies } from '../services/tmdb.service.js'
import catchAsync from '../utils/catchAsync.js'
import httpStatus from 'http-status'

export const getWatchlist = catchAsync(async (req, res) => {

})

export const addToWatchlist = catchAsync(async (req, res) => {
    const { movieId } = req.body
    const userId = req.userId
    const watchlistId = await watchlistService.getWatchlistIdByUserId(userId)
    if (!watchlist) {
        await watchlistService.createWatchlist(userId)
    }
    const watchlist = await watchlistService.addMovieToWatchlist(movieId, watchlistId)
    return res.status(httpStatus.OK).json({ watchlist })
})

export const removeFromWatchlist = catchAsync(async (req, res) => {
    const { movieId } = req.params
    const userId = req.userId
})

export const searchMovie = catchAsync(async (req, res) => {
    const { query } = req.query
    const results = await searchMovies(query)
    return res.status(httpStatus.OK).json({ results })
})