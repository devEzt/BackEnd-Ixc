import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import userRoutes from './routes/users'
import messageRoutes from './routes/message'

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
app.use('/api/messages', messageRoutes)

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

export default app
