import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks/rtkHooks'
import { useAuthStatus } from '../app/hooks/useAuthStatus'
import { likePost, unlikePost } from '../features/posts/postsSlice'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { Box, Paper, Typography, Divider, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

function PostDetails() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	//	user auth state and post info state
	const { loggedInUser } = useAuthStatus()
	const { post, liked, likeCount, featuresDisabled } = useAppSelector(
		(state) => state.posts.selectedPostDetails
	)

	// local liked/likeCount state
	const [detailsLiked, setDetailsLiked] = useState(liked)
	const [detailsLikeCount, setDetailsLikeCount] = useState(likeCount || 0)
	return (
		<Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
			{/* title */}
			<Typography
				align='center'
				variant='h2'
				sx={{
					mb: 4,
				}}
			>
				{post?.title}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-evenly',
					width: '100%',
				}}
			>
				<Box
					sx={{
						minWidth: '50%',
						maxWidth: '50%',
					}}
				>
					{/* creator info */}
					<span>Created by:</span>
					<Typography
						variant='h6'
						color='primary'
						sx={{ display: 'inline', ml: 2 }}
					>
						{post?.creator}
					</Typography>

					<Divider sx={{ my: 2 }} />

					{/* message */}
					<Typography
						variant='body1'
						align='center'
						sx={{
							my: 8,
						}}
					>
						{post?.message}
					</Typography>

					{/* tags */}
					<Typography
						variant='h6'
						color='secondary'
						sx={{
							mb: 2,
						}}
					>
						{post?.tags?.map((tag) => `#${tag} `)}
					</Typography>

					{/* age */}
					<Typography variant='body1'>
						{post && formatDistanceToNow(new Date(post.createdAt))}{' '}
						ago
					</Typography>

					<Divider sx={{ my: 2 }} />

					{/* comments */}
					<Typography
						variant='body1'
						sx={{
							my: 2,
						}}
					>
						Comments: <strong>None yet!</strong>
					</Typography>

					<Divider sx={{ my: 2 }} />

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-evenly',
							width: '100%',
							mt: 8,
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
								if (post && detailsLiked !== null) {
									e.preventDefault()
									if (!detailsLiked) {
										dispatch(
											likePost({ postId: post?._id })
										)
										setDetailsLikeCount(
											(detailsLikeCount) =>
												detailsLikeCount + 1
										)
									} else {
										dispatch(
											unlikePost({ postId: post._id })
										)
										setDetailsLikeCount(
											(detailsLikeCount) =>
												detailsLikeCount - 1
										)
									}
									setDetailsLiked(!detailsLiked)
								} else return
							}}
							disabled={
								!loggedInUser?.admin &&
								(featuresDisabled ||
									loggedInUser?.name !== post?.creator)
							}
						>
							<ThumbUpAltIcon
								fontSize='small'
								color={
									!loggedInUser?.admin &&
									(featuresDisabled ||
										loggedInUser?.name !== post?.creator)
										? 'disabled'
										: detailsLiked
										? 'primary'
										: 'action'
								}
								sx={{
									mr: 1,
									transform: detailsLiked ? 'scale(1.1)' : '',
								}}
							/>
							<span
								id='likeDetails'
								style={{
									color: 'rgb(119, 119, 119)',
								}}
							>
								Likes
								{` (${detailsLikeCount})`}
							</span>
						</Button>

						{/* return button */}
						<Button
							color='secondary'
							onClick={() => {
								navigate('/posts')
							}}
						>
							Return to Posts
						</Button>
					</Box>
				</Box>
				<Box
					sx={{
						p: 2,
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<img
						style={{
							maxWidth: '100%',
							maxHeight: '500px',
							borderRadius: '2rem',
							objectFit: 'contain',
						}}
						src={post?.imgBase64}
						alt='the pic'
					/>
				</Box>
			</Box>
		</Paper>
	)
}

export default PostDetails
