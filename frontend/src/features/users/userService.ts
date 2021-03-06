import axios from 'axios'
import { RegisterData, LoginData } from './userTypes'

const url = 'http://localhost:5000/users'
// const config = {
//     headers: {
//         "Content-Type": "application/json"
//     }
// }

const registerUser = async (signUpData: RegisterData) => {
	const response = await axios.post(url, signUpData)

	if (response.data && response.data.userData)
		localStorage.setItem('user', JSON.stringify(response.data.userData))

	return response.data
}

const loginUser = async (loginData: LoginData) => {
	const response = await axios.post(`${url}/login`, loginData)

	if (response.data && response.data.userData)
		localStorage.setItem('user', JSON.stringify(response.data.userData))

	return response.data
}

const logoutUser = () => {
	return localStorage.clear()
}

const checkUserPassword = async (_id: string, pass: string) => {
	const response = await axios.post(`${url}/authorize`, {
		_id,
		pass,
	})

	return response.data
}

const userService = {
	registerUser,
	loginUser,
	logoutUser,
	checkUserPassword,
}

export default userService
