import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../app/hooks/rtkHooks'
import { useNavigate } from 'react-router-dom'
import {
	registerUser,
	loginUser,
	resetUserState,
} from '../features/users/userSlice'
import { toast } from 'react-toastify'
import {
	Avatar,
	Button,
	Box,
	Container,
	Paper,
	TextField,
	Typography,
	IconButton,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

function Auth() {
	const toastOptions = {
		autoClose: 4000,
		position: toast.POSITION.BOTTOM_RIGHT,
	}

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [isSignUp, setIsSignUp] = useState(true)
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const { name, email, password } = formData

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (isSignUp) {
			const signUpData = {
				name,
				email,
				password,
			}

			const signupResponse = await dispatch(registerUser(signUpData))
			if (signupResponse.type === 'users/registerUser/fulfilled') {
				dispatch(resetUserState())
				return navigate('/')
			} else {
				return toast.error(
					'Error: Existing user with email provided!  Please choose a different one.',
					toastOptions
				)
			}
		} else {
			const loginData = {
				email,
				password,
			}

			const loginResponse = await dispatch(loginUser(loginData))
			if (loginResponse.type === 'users/loginUser/fulfilled') {
				dispatch(resetUserState())
				return navigate('/')
			} else {
				return toast.error(
					'Error: Bad login info provided!  Try re-typing your email and password.',
					toastOptions
				)
			}
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<Container
			maxWidth='xs'
			sx={{
				mt: 8,
			}}
		>
			<Paper
				elevation={3}
				sx={{
					my: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					p: 2,
				}}
			>
				<Avatar
					sx={{
						my: 1,
						backgroundColor: 'red',
					}}
				>
					<LockOutlinedIcon />
				</Avatar>

				<Typography
					variant='h5'
					sx={{
						mb: 2,
					}}
				>
					{isSignUp ? 'Sign Up' : 'Sign In'}
				</Typography>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<form onSubmit={handleSubmit}>
						<Container
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							{isSignUp && (
								<>
									<TextField
										name='name'
										label='Name'
										value={name}
										onChange={handleChange}
										autoFocus
										variant='outlined'
										required
										fullWidth
										sx={{
											mb: 2,
										}}
									/>
								</>
							)}
							<TextField
								name='email'
								label='Email Address'
								type='email'
								value={email}
								onChange={handleChange}
								variant='outlined'
								required
								fullWidth
								sx={{
									mb: 2,
								}}
							/>
							<Box
								id='passwordInputBox'
								sx={{
									position: 'relative',
									width: '100%',
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<TextField
									name='password'
									label='Password'
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={handleChange}
									variant='outlined'
									required
									fullWidth
								/>
								<IconButton
									aria-label='showPassword'
									onClick={() =>
										setShowPassword(!showPassword)
									}
									sx={{
										position: 'absolute',
										right: '1rem',
									}}
								>
									<VisibilityIcon />
								</IconButton>
							</Box>

							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='secondary'
								sx={{
									mb: 2,
									mt: 4,
								}}
							>
								{isSignUp ? 'Sign Up' : 'Sign In'}
							</Button>

							<Button
								onClick={() => {
									setIsSignUp(!isSignUp)
									setFormData({
										name: '',
										email: '',
										password: '',
									})
								}}
								variant='contained'
								color='primary'
								sx={{
									my: 2,
								}}
							>
								{isSignUp
									? 'Already have an account? Sign In'
									: "Don't have an account yet? Sign Up!"}
							</Button>
						</Container>
					</form>
				</Box>
			</Paper>
		</Container>
	)
}

export default Auth
