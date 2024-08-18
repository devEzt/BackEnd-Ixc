import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/users'

dotenv.config()
const app = express()

app.use(express.json())

const dbURI = process.env.MONGO_URI as string

app.use('/api/users', userRoutes)

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

export default app
