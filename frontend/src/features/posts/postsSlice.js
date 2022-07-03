import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postsService from './postsService.js'

const initialState = {
	postsArray: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

export const getPosts = createAsyncThunk(
	'posts/getPosts',
	async (_, thunkAPI) => {
		try {
			return await postsService.getPosts()
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.resonse.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const createPost = createAsyncThunk(
	'posts/createPost',
	async (newPost, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.currentUser.token
			return await postsService.createPost(newPost, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.resonse.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const updatePost = createAsyncThunk(
	'posts/updatePost',
	async (
		{ currentPostId: postId, updatedPostData: updatedPost },
		thunkAPI
	) => {
		try {
			const token = thunkAPI.getState().user.currentUser.token
			return await postsService.updatePost(postId, updatedPost, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.resonse.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const likePost = createAsyncThunk(
	'posts/likePost',
	async (postId, thunkAPI) => {
		try {
			const currentUserId = thunkAPI.getState().user.currentUser._id
			const token = thunkAPI.getState().user.currentUser.token
			return await postsService.likePost(postId, currentUserId, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.resonse.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const unlikePost = createAsyncThunk(
	'posts/unlikePost',
	async (postId, thunkAPI) => {
		try {
			const currentUserId = thunkAPI.getState().user.currentUser._id
			const token = thunkAPI.getState().user.currentUser.token
			return await postsService.unlikePost(postId, currentUserId, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.resonse.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const deletePost = createAsyncThunk(
	'posts/deletePost',
	async (postId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().user.currentUser.token
			return await postsService.deletePost(postId, token)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.resonse.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const searchPosts = createAsyncThunk(
	'posts/searchPosts',
	async ({ query, tags }, thunkAPI) => {
		try {
			tags
				? console.log(`query: ${query}, tags: ${tags.join(',')}`)
				: console.log(`query: ${query}`)
			return await postsService.searchPosts(query, tags && tags.join(','))
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.resonse.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		resetPostsState: (state) => {
			state.isError = false
			state.isSuccess = false
			state.isLoading = false
			state.message = ''
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getPosts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.postsArray = action.payload
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(searchPosts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(searchPosts.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.postsArray =
					action.payload !== 'Request failed with status code 500'
						? action.payload
						: state.postsArray
			})
			.addCase(searchPosts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(createPost.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.postsArray.push(action.payload)
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(updatePost.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.postsArray = state.postsArray.map((post) =>
					post._id === action.payload._id ? action.payload : post
				)
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(deletePost.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.postsArray = state.postsArray.filter(
					(post) => post._id !== action.payload
				)
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { resetPostsState } = postsSlice.actions
export default postsSlice.reducer
