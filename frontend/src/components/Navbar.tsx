import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks/rtkHooks'
import { logoutUser } from '../features/users/userSlice'
import { useAuthStatus } from '../app/hooks/useAuthStatus'
import {
	Box,
	AppBar,
	Typography,
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
const dogLogo = require('../assets/dogLogo.png') as string
import {
	deepOrange,
	amber,
	cyan,
	indigo,
	lime,
	pink,
	teal,
	blue,
	green,
} from '@mui/material/colors'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'

function Navbar() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { loggedIn, loggedInUser, firstName, firstLetter } = useAuthStatus()

	const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
	const possibleAvatarColors = [
		deepOrange[500],
		amber[500],
		cyan[500],
		indigo[500],
		lime[500],
		pink[500],
		teal[500],
		blue[500],
		green[500],
	]
	const avatarColorsIndex =
		firstLetter?.charCodeAt(0) % possibleAvatarColors.length

	return (
		<AppBar
			position='static'
			color='inherit'
			sx={{
				borderRadius: 4,
				py: 1,
				px: 4,
				my: 3,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<Typography
					variant='h2'
					align='center'
					component={Link}
					to='/'
					sx={{
						textDecoration: 'none',
					}}
				>
					PetSocial
				</Typography>

				<Box
					sx={{
						mx: 5,
					}}
				>
					<img
						src={dogLogo}
						alt='logo'
						height='75'
						// Image source: https://www.vecteezy.com/vector-art/5162048-cartoon-dog-walking-on-white-background "Dog Vectors by Vecteezy" submitted by user tigatelu
					/>
				</Box>
			</Box>

			{loggedIn ? (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '30%',
					}}
				>
					<Avatar
						sx={{
							bgcolor: avatarColorsIndex
								? possibleAvatarColors[avatarColorsIndex]
								: deepOrange[500],
						}}
					>
						{firstLetter && firstLetter}
					</Avatar>
					<Typography
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontWeight: 'bold',
						}}
					>
						{firstName && firstName}
						{loggedInUser?.admin && (
							<BuildCircleIcon color='secondary' sx={{ ml: 2 }} />
						)}
					</Typography>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => {
							setLogoutDialogOpen(true)
						}}
					>
						Logout
					</Button>

					<Dialog
						open={logoutDialogOpen}
						onClose={() => setLogoutDialogOpen(false)}
						aria-labelledby='logout-button-dialog-box'
						aria-describedby='prompts the user with a confirmation dialog for logging out'
					>
						<DialogTitle>{'Logout user?'}</DialogTitle>

						<DialogContent>
							<DialogContentText>
								Are you sure you want to logout? If so you will
								be redirected to the login page.
							</DialogContentText>
						</DialogContent>

						<DialogActions>
							<Button onClick={() => setLogoutDialogOpen(false)}>
								Nevermind
							</Button>
							<Button
								onClick={() => {
									setLogoutDialogOpen(false)
									dispatch(logoutUser())
									navigate('/auth')
								}}
							>
								Log me out!
							</Button>
						</DialogActions>
					</Dialog>
				</Box>
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						px: 2,
					}}
				>
					<Button
						variant='contained'
						onClick={() => navigate('/auth')}
					>
						Sign In
					</Button>
				</Box>
			)}
		</AppBar>
	)
}

export default Navbar
