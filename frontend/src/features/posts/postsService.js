import axios from 'axios'

const url = 'http://localhost:5000/posts'

const getPosts = async () => {
	const response = await axios.get(url)
	const postsData = response.data
	return postsData
}

const getPaginatedPosts = async (page, limit) => {
	if (!page) page = 1
	if (!limit) limit = 4
	const index = (page - 1) * limit
	const response = await axios.get(
		`${url}/paginated?page=${page}&limit=${limit}&index=${index}`
	)
	const postsData = response.data
	return postsData
}

const createPost = async (newPost, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.post(url, newPost, config)
	return response.data
}

const updatePost = async (postId, updatedPost, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	try {
		const response = await axios.patch(
			`${url}/${postId}`,
			updatedPost,
			config
		)
		return response.data
	} catch (error) {
		return error.message
	}
}

const likePost = async (postId, userId, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	try {
		const response = await axios.patch(
			`${url}/${postId}/${userId}/likePost`,
			[],
			config
		)
		return response.data
	} catch (error) {
		return console.log(error)
	}
}

const unlikePost = async (postId, userId, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	try {
		const response = await axios.patch(
			`${url}/${postId}/${userId}/unlikePost`,
			[],
			config
		)
		return response.data
	} catch (error) {
		return console.log(error)
	}
}

const deletePost = async (postId, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	}

	try {
		const response = await axios.delete(`${url}/${postId}`, config)
		return response.data
	} catch (error) {
		return error.message
	}
}

const searchPosts = async (query, tags) => {
	try {
		const response =
			query && tags
				? await axios.get(`${url}/search?query=${query}&tags=${tags}`)
				: !query && tags
				? await axios.get(`${url}/search?tags=${tags}`)
				: await axios.get(`${url}/search?query=${query}`)

		return response.data
	} catch (error) {
		return error.message
	}
}

const postsService = {
	getPosts,
	getPaginatedPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
	unlikePost,
	searchPosts,
}

export default postsService
