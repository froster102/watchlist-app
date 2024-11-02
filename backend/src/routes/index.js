import express from 'express'
import authRoute from './auth.route.js'
import watchlistRoute from './watchlist.route.js'

const router = express.Router()

const defaultRoutes = [
    {
        path:'/auth',
        route : authRoute
    },
    {
        path:'/watchlist',
        route : watchlistRoute
    }
]

defaultRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})

export default router