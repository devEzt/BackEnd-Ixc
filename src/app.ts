import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors' // Importar o pacote CORS

import userRoutes from './routes/users'

dotenv.config()
const app = express()

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

const dbURI = process.env.MONGO_URI as string

app.use('/api/users', userRoutes)

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

export default app
