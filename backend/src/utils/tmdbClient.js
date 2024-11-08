import axios from 'axios'
import config from '../config/config.js'

const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${config.tmdb.accessToken}`
    }
})

export default tmdbClient