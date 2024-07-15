import express from 'express'
import { config } from 'dotenv'
import userRouter from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import adminRoute from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser'

config()

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', userRouter)
app.use('/api/admin', adminRoute)

app.get('/', (req, res) => res.send('Server is running'))

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
