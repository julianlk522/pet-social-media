import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { errorHandler } from './middleware/errorMiddleware'

const app = express()
dotenv.config({ path: '../.env' })
const PORT = process.env.PORT || 5000

//  Mongoose connect

const connectDB = async (): Promise<void> => {
	try {
		const conn = await mongoose.connect(
			process.env.MONGO_CLUSTER_CONNECTION_STRING ?? ''
		)
		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (error) {
		console.log(`Error: ${error}`)
		process.exit(1)
	}
}
connectDB()

app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ extended: false, limit: '25mb' }))
app.use(cors())
// Error middleware
app.use(errorHandler)

//  Routes

import postRoutes from './routes/postRoutes'
app.use('/posts', postRoutes)

import userRoutes from './routes/userRoutes'
app.use('/users', userRoutes)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
