import express from 'express'
import { errorConvertor, errorHandler, notFound } from './middleware/errorMiddleware.js'
import routes from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './config/config.js';
import connectToDatabase from './db/connection.js'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', routes)

app.get('/', (req, res) => res.status(200).json({message:'Server is running'}))

app.use(notFound)
app.use(errorConvertor)
app.use(errorHandler)

app.listen(config.server.PORT, async () => {
  console.log(`Server is running on ${config.server.PORT}`);
  await connectToDatabase()
});
