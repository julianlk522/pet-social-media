import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (!req.headers.authorization) {
        res.status(400)
        console.log(req.headers)
        throw new Error('Bearer token not provided')
    }

    if (req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await UserModel.findById(decodedToken.id).select('-password')

        next()
    } else {
        res.status(401)
        throw new Error('Invalid bearer token provided', token)
    }
})

export default protect