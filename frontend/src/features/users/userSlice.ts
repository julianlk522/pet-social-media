import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store.js'
import { UserState, UserData, RegisterData, LoginData } from './userTypes'
import userService from './userService'

//  Check localstorage for user
const savedUser = JSON.parse(localStorage.getItem('user') ?? '')

const initialState: UserState = {
	currentUser: savedUser ? savedUser : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

export const registerUser = createAsyncThunk<
	{ userData: UserData },
	RegisterData,
	{ state: RootState }
>('users/registerUser', async (signUpData, thunkAPI) => {
	try {
		return await userService.registerUser(signUpData)
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

export const loginUser = createAsyncThunk<
	{ userData: UserData },
	LoginData,
	{ state: RootState }
>('users/loginUser', async (loginData, thunkAPI) => {
	try {
		return await userService.loginUser(loginData)
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

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
	await userService.logoutUser()
})

export const checkUserPassword = createAsyncThunk<
	{ status: string },
	{ _id: string; pass: string },
	{ state: RootState }
>('users/checkUserPassword', async ({ _id, pass }, thunkAPI) => {
	try {
		return await userService.checkUserPassword(_id, pass)
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
				state.currentUser = action.payload.userData
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isError = true
				state.message =
					typeof action.payload === 'string' ? action.payload : ''
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = true
				state.isSuccess = true
				state.currentUser = action.payload.userData
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isError = true
				state.message =
					typeof action.payload === 'string' ? action.payload : ''
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
				state.message =
					typeof action.payload === 'string' ? action.payload : ''
				state.isLoading = false
			})
	},
})

export const { resetUserState } = userSlice.actions
export default userSlice.reducer
