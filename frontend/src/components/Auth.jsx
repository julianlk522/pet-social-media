import {
	Avatar,
	Button,
	Box,
	Container,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	registerUser,
	loginUser,
	resetUserState,
} from '../features/users/userSlice'

function Auth() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [isSignUp, setIsSignUp] = useState(true)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const { name, email, password } = formData

	const handleSubmit = (e) => {
		e.preventDefault()

		if (isSignUp) {
			const signUpData = {
				name,
				email,
				password,
			}

			dispatch(registerUser(signUpData))
		} else {
			const loginData = {
				email,
				password,
			}

			dispatch(loginUser(loginData))
		}
		dispatch(resetUserState())
		navigate('/')
	}

	const handleChange = (e) => {
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
							spacing={2}
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
							<TextField
								name='password'
								label='Password'
								type='password'
								value={password}
								onChange={handleChange}
								variant='outlined'
								required
								fullWidth
							/>

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
										lastName: '',
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
