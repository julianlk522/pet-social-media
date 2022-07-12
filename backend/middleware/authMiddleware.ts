import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel.js'

interface AuthRequest extends Request {
	user?: any
}

const protect = asyncHandler(
	async (req: AuthRequest, res: Response, next: NextFunction) => {
		let token

		if (!req.headers.authorization) {
			res.status(400)
			console.log(req.headers)
			throw new Error('Bearer token not provided')
		}

		if (!process.env.JWT_SECRET) {
			throw new Error('JWT secret not found')
		}

		if (req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1]

			interface JwtPayload {
				id: string
			}

			const decodedToken = jwt.verify(
				token,
				process.env.JWT_SECRET
			) as JwtPayload

			req.user = await UserModel.findById(decodedToken.id).select(
				'-password'
			)

			next()
		} else {
			res.status(401)
			throw new Error('Invalid bearer token provided', token)
		}
	}
)

export default protect
