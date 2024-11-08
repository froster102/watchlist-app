import ApiError from '../utils/ApiError.js'
import catchAsync from '../utils/catchAsync.js'
import tmdbClient from '../utils/tmdbClient.js'
import httpStatus from 'http-status'

export const getWatchlist = catchAsync(async (req, res) => {
    
})

export const addToWatchlist = catchAsync(async (req, res) => {
    const { movieId } = req.body

})

export const removeFromWatchlist = catchAsync(async (req, res) => {
    const { movieId } = req.params
})

export const searchMovie = catchAsync(async (req, res) => {
    const { query } = req.query
    try {
        const response = await tmdbClient.get(`/search/movie?query=${query}`)
        const results = response.data.results
        console.log(results)
        return res.status(httpStatus.OK).json(results)
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Internal server error')
    }
})