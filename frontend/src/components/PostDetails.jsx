import React from 'react'
import { Box, Paper, Typography, Divider } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

function PostDetails() {
	const { state } = useLocation()
	const { post } = state

	return (
		<Paper elevation={6} sx={{ p: 2, borderRadius: 4 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-evenly',
					width: '100%',
				}}
			>
				<Box
					sx={{
						borderRadius: 4,
						m: 2,
						minWidth: '50%',
					}}
				>
					<Typography variant='h2'>{post.title}</Typography>
					<Typography variant='h6' gutterBottom color='secondary'>
						{post.tags?.map((tag) => `#${tag} `)}
					</Typography>
					<Typography variant='body1' gutterBottom>
						{post.message}
					</Typography>
					<Typography variant='h6' gutterBottom>
						Created by: {post.creator}
					</Typography>
					<Typography variant='body1'>
						{formatDistanceToNow(new Date(post.createdAt))} ago
					</Typography>
					<Divider sx={{ margin: 2 }} />
					<Typography variant='body1' gutterBottom>
						Comments: <strong>None yet!</strong>
					</Typography>
					<Divider sx={{ margin: 2 }} />
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<img
						style={{
							width: '50%',
							borderRadius: '2rem',
							objectFit: 'contain',
						}}
						src={post.imgBase64}
						alt='the pic'
					/>
				</Box>
			</Box>
		</Paper>
	)
}

export default PostDetails
