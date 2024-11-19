import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    tmdbMovieId: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    movieTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { id: false })

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    movies: [movieSchema]
}, { timestamps: true })

/**
 * @typedef Watchlist
 */
const Watchlist = mongoose.model('Watchlist', watchlistSchema)

export default Watchlist