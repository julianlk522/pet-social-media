import axios from "axios"

const url = 'http://localhost:5000/users'
// const config = {
//     headers: {
//         "Content-Type": "application/json"
//     }
// }

const registerUser = async (userData) => {
    const response = await axios.post(url, userData)

    if (response.data) localStorage.setItem('user', JSON.stringify(response.data))

    return response.data
}

const loginUser = async (loginData) => {
    const response = await axios.post(`${url}/login`, loginData)
    
    if (response.data) localStorage.setItem('user', JSON.stringify(response.data))
    
    return response.data
}

const logoutUser = () => {
    return localStorage.clear()
}

const userService = {
    registerUser,
    loginUser,
    logoutUser,
}

export default userService