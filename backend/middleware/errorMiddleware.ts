import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'

export const errorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = res.statusCode ? res.statusCode : 500
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	})
}
