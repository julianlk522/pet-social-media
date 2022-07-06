import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

//  Check localstorage for user
const savedUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
	currentUser: savedUser ? savedUser : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

export const registerUser = createAsyncThunk(
	'users/registerUser',
	async (userData, thunkAPI) => {
		try {
			return await userService.registerUser(userData)
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

export const loginUser = createAsyncThunk(
	'users/loginUser',
	async (loginData, thunkAPI) => {
		try {
			return await userService.loginUser(loginData)
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

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
	await userService.logoutUser()
})

export const checkUserPassword = createAsyncThunk(
	'users/checkUserPassword',
	async ({ _id, pass }, thunkAPI) => {
		try {
			return await userService.checkUserPassword(_id, pass)
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

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUserState: (state) => {
			state.isError = false
			state.isSuccess = false
			state.isLoading = false
			state.message = ''
		},
	},
	extraReducers(builder) {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = true
				state.isSuccess = true
				state.currentUser = action.payload
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isError = true
				state.message = action.payload
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = true
				state.isSuccess = true
				state.currentUser = action.payload
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isError = true
				state.message = action.payload
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.currentUser = null
			})
			.addCase(checkUserPassword.pending, (state) => {
				state.isLoading = true
			})
			.addCase(checkUserPassword.fulfilled, (state) => {
				state.isSuccess = true
				state.isLoading = false
			})
			.addCase(checkUserPassword.rejected, (state, action) => {
				state.isError = true
				state.message = action.payload
				state.isLoading = false
			})
	},
})

export const { resetUserState } = userSlice.actions
export default userSlice.reducer
