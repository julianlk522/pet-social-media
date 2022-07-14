import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { FetchedPostData, NewPostData, PostsState } from './postTypes'
import postsService from './postsService'

const initialState: PostsState = {
	postsArray: [],
	selectedPost: null,
	totalPages: null,
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
		} catch (error: any) {
			const message =
				(error.response &&
					error?.response.data &&
					error.resonse.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const getPaginatedPosts = createAsyncThunk<
	{ postData: [FetchedPostData]; totalPages: string },
	{ page: string; limit?: string },
	{ state: RootState }
>('posts/getPaginatedPosts', async ({ page, limit }, thunkAPI) => {
	try {
		return await postsService.getPaginatedPosts(page, limit)
	} catch (error: any) {
		const message =
			(error.response &&
				error.response.data &&
				error.resonse.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const createPost = createAsyncThunk<
	{ postData: FetchedPostData },
	NewPostData,
	{ state: RootState }
>('posts/createPost', async (newPost, thunkAPI) => {
	try {
		const token = thunkAPI.getState().user?.currentUser?.token
		return await postsService.createPost(newPost, token)
	} catch (error: any) {
		const message =
			(error.response &&
				error.response.data &&
				error.resonse.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const updatePost = createAsyncThunk<
	{ postData: FetchedPostData },
	{ currentPostId: string; updatedPostData: NewPostData },
	{ state: RootState }
>(
	'posts/updatePost',
	async (
		{ currentPostId: postId, updatedPostData: updatedPost },
		thunkAPI
	) => {
		try {
			const token = thunkAPI.getState().user?.currentUser?.token
			return await postsService.updatePost(postId, updatedPost, token)
		} catch (error: any) {
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

export const likePost = createAsyncThunk<
	{ likes: [] },
	{ postId: string },
	{ state: RootState }
>('posts/likePost', async ({ postId }, thunkAPI) => {
	try {
		const currentUserId = thunkAPI.getState().user?.currentUser?._id
		const token = thunkAPI.getState().user?.currentUser?.token
		return await postsService.likePost(postId, currentUserId, token)
	} catch (error: any) {
		const message =
			(error.response &&
				error.response.data &&
				error.resonse.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const unlikePost = createAsyncThunk<
	{ likes: [] },
	{ postId: string },
	{ state: RootState }
>('posts/unlikePost', async ({ postId }, thunkAPI) => {
	try {
		const currentUserId = thunkAPI.getState().user?.currentUser?._id
		const token = thunkAPI.getState().user?.currentUser?.token
		return await postsService.unlikePost(postId, currentUserId, token)
	} catch (error: any) {
		const message =
			(error.response &&
				error.response.data &&
				error.resonse.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const deletePost = createAsyncThunk<
	{ postId: string },
	{ postId: string },
	{ state: RootState }
>('posts/deletePost', async ({ postId }, thunkAPI) => {
	try {
		const token = thunkAPI.getState().user?.currentUser?.token
		return await postsService.deletePost(postId, token)
	} catch (error: any) {
		const message =
			(error.response &&
				error.response.data &&
				error.resonse.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const searchPosts = createAsyncThunk<
	{ postData: [FetchedPostData] },
	{ query: string; tags?: string[] | undefined },
	{ state: RootState }
>('posts/searchPosts', async ({ query, tags }, thunkAPI) => {
	try {
		tags
			? console.log(`query: ${query}, tags: ${tags.join(',')}`)
			: console.log(`query: ${query}`)
		return await postsService.searchPosts(query, tags && tags.join(','))
	} catch (error: any) {
		const message =
			(error.response &&
				error.response.data &&
				error.resonse.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		resetPostsState: (state) => {
			state.isError = false
			state.isSuccess = false
			state.isLoading = false
			state.message = ''
			state.totalPages = null
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
				state.postsArray = action.payload.postData
					? action.payload.postData
					: state.postsArray
				state.totalPages = action.payload.totalPages
					? action.payload.totalPages
					: state.totalPages
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message =
					typeof action.payload === 'string' ? action.payload : ''
			})
			.addCase(getPaginatedPosts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getPaginatedPosts.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.postsArray = action.payload.postData
					? action.payload.postData
					: state.postsArray
				state.totalPages = action.payload.totalPages
					? action.payload.totalPages
					: state.totalPages
			})
			.addCase(getPaginatedPosts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message =
					typeof action.payload === 'string' ? action.payload : ''
			})
			.addCase(searchPosts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(searchPosts.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.postsArray = action.payload.postData
					? action.payload.postData
					: state.postsArray
			})
			.addCase(searchPosts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message =
					typeof action.payload === 'string' ? action.payload : ''
			})
			.addCase(createPost.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				action.payload.postData !== null &&
					state.postsArray.push(action.payload.postData)
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message =
					typeof action.payload === 'string' ? action.payload : ''
			})
			.addCase(updatePost.pending, (state) => {
				state.isLoading = true
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.postsArray = state.postsArray.map((post) =>
					post._id === action.payload.postData._id
						? action.payload.postData
						: post
				)
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message =
					typeof action.payload === 'string' ? action.payload : ''
			})
			.addCase(deletePost.pending, (state) => {
				state.isLoading = true
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.postsArray = state.postsArray.filter(
					(post) => post._id !== action.payload.postId
				)
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message =
					typeof action.payload === 'string' ? action.payload : ''
			})
	},
})

export const { resetPostsState } = postsSlice.actions
export default postsSlice.reducer
