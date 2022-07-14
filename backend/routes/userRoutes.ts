import express from 'express'
const router = express.Router()
import {
	registerUser,
	loginUser,
	checkUserPassword,
} from '../controllers/userController'

router.route('/').post(registerUser)

router.route('/login').post(loginUser)

router.route('/authorize').post(checkUserPassword)

export default router
