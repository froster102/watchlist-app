import express from "express";
import { watchlistController } from "../controllers/index.js";
import { auth } from "../middleware/auth.js";

const router = express.Router()

router.use(auth)

router
    .route('/')
    .get(watchlistController.getWatchlist)
    .post(watchlistController.addToWatchlist)
router.delete('/:movieId', watchlistController.removeFromWatchlist)
router.get('/search', watchlistController.searchMovie)

export default router