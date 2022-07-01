import axios from "axios";

const url = 'http://localhost:5000/posts'

const getPosts = async () => {
    const response = await axios.get(url)
    const postsData = response.data
    return postsData
}

const createPost = async (newPost, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(url, newPost, config)
    return response.data
}

const updatePost = async (postId, updatedPost, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    
    try {
        const response = await axios.patch(`${url}/${postId}`, updatedPost, config)
        return response.data
    } catch (error) {
        return error.message
    }
}

const likePost = async (postId, userId, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    
    try {
        const response = await axios.patch(`${url}/${postId}/${userId}/likePost`, [], config)
        return response.data
    } catch (error) {
        return console.log(error)
    }
}

const deletePost = async (postId, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    
    try {
        const response = await axios.delete(`${url}/${postId}`, config)
        return response.data
    } catch (error) {
        return console.log(error)
    }
}

const postsService = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
}

export default postsService