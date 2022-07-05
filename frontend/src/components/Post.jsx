import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	deletePost,
	likePost,
	unlikePost,
} from '../features/posts/postsSlice.js'
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { formatDistanceToNow } from 'date-fns'

function Post({ post, setCurrentPostId, featuresDisabled, loggedInUser }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const likes = post.likes

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

	// liked/likeCount state
	const [liked, setLiked] = useState(false)
	const [likeCount, setLikeCount] = useState(likes?.length)

	useEffect(() => {
		const checkIfUserLiked = () => {
			if (likes?.includes(loggedInUser?._id)) {
				setLiked(true)
			}
		}
		checkIfUserLiked()
	}, [loggedInUser, likes])

	return (
		<Card
			raised
			elevation={6}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				borderRadius: 4,
				height: '100%',
				position: 'relative',
			}}
		>
			<CardMedia
				onClick={() =>
					navigate(`/posts/${post._id}`, {
						state: {
							post: post,
							liked: liked,
							likeCount: likeCount,
							featuresDisabled: featuresDisabled,
							loggedInUser: loggedInUser,
						},
					})
				}
				image={post.imgBase64}
				title={post.title}
				sx={{
					pt: '50%',
					bgcolor: 'rgba(0, 0, 0, 0.5)',
					backgroundBlendMode: 'darken',
					cursor: 'pointer',
				}}
			/>
			{/* post creator and post age */}
			<Box
				sx={{
					position: 'absolute',
					top: '5%',
					left: '5%',
					color: 'white',
				}}
			>
				<Typography variant='h6'>{post.creator}</Typography>
				<Typography variant='body2'>
					{formatDistanceToNow(new Date(post.createdAt))}
				</Typography>
			</Box>
			{/* edit button */}
			<Box
				sx={{
					position: 'absolute',
					top: '5%',
					right: '5%',
					color: 'white',
				}}
			>
				<Button
					size='small'
					onClick={() => setCurrentPostId(post._id)}
					disabled={
						loggedInUser?.admin
							? false
							: featuresDisabled ||
							  loggedInUser?.name !== post.creator
					}
					sx={{
						color: 'white',
					}}
				>
					<MoreHorizIcon />
				</Button>
			</Box>
			<CardContent
				onClick={() =>
					navigate(`/posts/${post._id}`, {
						state: {
							post: post,
							liked: liked,
							likeCount: likeCount,
							featuresDisabled: featuresDisabled,
							loggedInUser: loggedInUser,
						},
					})
				}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					cursor: 'pointer',
				}}
			>
				{/* tags box */}
				<Box
					sx={{
						m: 1,
					}}
				>
					<Typography variant='body2' align='center'>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
				</Box>
				{/* title */}
				<Typography
					variant='h5'
					sx={{
						px: 2,
						m: 1,
					}}
				>
					{post.title}
					{/* message */}
				</Typography>
				<Typography
					variant='body2'
					color='textSecondary'
					sx={{
						m: 1,
					}}
				>
					{post.message}
				</Typography>
			</CardContent>

			<CardActions
				sx={{
					px: 2,
					pt: 1,
					display: 'flex',
					justifyContent: 'space-evenly',
				}}
			>
				{/* likes */}
				<Button
					size='small'
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
					onClick={(e) => {
						e.preventDefault()
						if (!liked) {
							dispatch(likePost(post._id))
							setLikeCount((likeCount) => likeCount + 1)
						} else {
							dispatch(unlikePost(post._id))
							setLikeCount((likeCount) => likeCount - 1)
						}
						setLiked(!liked)
					}}
					disabled={
						loggedInUser?.admin
							? false
							: featuresDisabled ||
							  loggedInUser?.name !== post.creator
					}
				>
					<ThumbUpAltIcon
						fontSize='small'
						color={liked ? 'primary' : 'action'}
						sx={{
							mr: 1,
							transform: liked && 'scale(1.1)',
						}}
					/>
					<span
						id='likeDetails'
						style={{
							color: 'rgb(119, 119, 119)',
						}}
					>
						Likes
						{` (${likeCount})`}
					</span>
				</Button>

				{/* delete button */}
				<Button
					size='small'
					onClick={() => {
						setDeleteDialogOpen(true)
					}}
					disabled={
						loggedInUser?.admin
							? false
							: featuresDisabled ||
							  loggedInUser?.name !== post.creator
					}
				>
					<DeleteIcon
						fontSize='small'
						sx={{
							mr: 1,
						}}
					/>
					Delete
				</Button>

				<Dialog
					open={deleteDialogOpen}
					onClose={() => setDeleteDialogOpen(false)}
					aria-labelledby='delete-button-dialog-box'
					aria-describedby='delete-dialog-prompt'
				>
					<DialogTitle id='delete-button-dialog-box'>
						{'Are you sure you want to delete this post?'}
					</DialogTitle>

					<DialogContent>
						<DialogContentText id='delete-dialog-prompt'>
							Once the post is deleted it will be removed from
							PetSocial forever!
						</DialogContentText>
					</DialogContent>

					<DialogActions>
						<Button onClick={() => setDeleteDialogOpen(false)}>
							Nevermind
						</Button>
						<Button
							onClick={() => {
								setDeleteDialogOpen(false)
								dispatch(deletePost(post._id))
							}}
						>
							Delete the post
						</Button>
					</DialogActions>
				</Dialog>
			</CardActions>
		</Card>
	)
}

export default Post
