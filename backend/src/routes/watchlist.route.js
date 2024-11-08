import express from "express";
import { watchlistController } from "../controllers/index.js";

const router = express.Router()

router
    .route('/')
    .get(watchlistController.getWatchlist)
    .post(watchlistController.addToWatchlist)
    .delete(watchlistController.removeFromWatchlist)
router.get('/search', watchlistController.searchMovie)

export default router