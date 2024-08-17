import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())

const dbURI = process.env.MONGO_URI

if (!dbURI) {
  throw new Error('MONGO_URI environment variable is not defined')
}

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ' + err))

export default app
