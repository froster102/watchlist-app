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
}, { _id: false })

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    movies: {
        type: [movieSchema],
        validate: {
            validator: function (movieDoc) {
                const tmdbMovieIds = movieDoc.map(movie => movie.tmdbMovieId)
                const uniqueTmdbMovieIds = new Set(tmdbMovieIds)
                return tmdbMovieIds.length === uniqueTmdbMovieIds.size
            },
            message: 'Movie already exists'
        }
    }
}, { timestamps: true })

movieSchema.pre('save', function (next) {
    if (this.isModified('thumbnail') && this.thumbnail) {
        const baseUrl = 'https://image.tmdb.org/t/p/w500'
        if (!this.thumbnail.startsWith(baseUrl)) {
            this.thumbnail = baseUrl + this.thumbnail
        }
    }
    next()
})

/**
 * @typedef Watchlist
 */
const Watchlist = mongoose.model('Watchlist', watchlistSchema)

export default Watchlist