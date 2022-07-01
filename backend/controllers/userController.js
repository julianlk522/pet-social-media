import mongoose from 'mongoose'
import UserModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'

const createBearerToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

export const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error(`Name, email, and password must all be provided, received ${name}, ${email}, ${password}`)
    }
    
    //  Check if user already exists
    const userExists = await UserModel.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists with email provided')
    }

    //  Hash password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    //  Create user in MDB
    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword
    })

    //  Send back response with new user data
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: createBearerToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data supplied')
    }
})

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    //  Check if user exists with email provided
    const user = await UserModel.findOne({email})

    if (!user) {
        res.status(400)
        throw new Error('User not found with email provided')
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: createBearerToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Incorrect password provided')
    }
})