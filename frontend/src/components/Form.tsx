import React, { useState, useEffect, FormEvent } from 'react'
import { TextField, Button, Typography, Paper, Box } from '@mui/material'
import FileBase from 'react-file-base64'
import { useAppDispatch, useAppSelector } from '../app/hooks/rtkHooks'
import { useAuthStatus } from '../app/hooks/useAuthStatus'
import { createPost, updatePost } from '../features/posts/postsSlice.js'

function Form({ currentPostId, setCurrentPostId }) {
	type FormData = {
		title: string
		message: string
		tags: string[]
		imgBase64?: string | undefined
	}

	const [formData, setFormData] = useState<FormData>({
		title: '',
		message: '',
		tags: [],
		imgBase64: '',
	})

	const dispatch = useAppDispatch()
	const { loggedIn, loggedInUser } = useAuthStatus()
	const currentPost = useAppSelector((state) =>
		currentPostId
			? state.posts.postsArray.find((post) => post._id === currentPostId)
			: null
	)

	useEffect(() => {
		if (currentPost) {
			const { title, message, tags, imgBase64 } = currentPost
			setFormData({ title, message, tags, imgBase64 })
		}
	}, [currentPost])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const updatedPostData = {
			...formData,
			creator: loggedInUser !== null ? loggedInUser.name : 'Creator',
		}

		if (currentPostId) {
			dispatch(updatePost({ currentPostId, updatedPostData }))
		} else {
			dispatch(createPost(updatedPostData))
		}
		handleClear()
	}

	const handleClear = () => {
		setCurrentPostId(null)
		setFormData({
			title: '',
			message: '',
			tags: [],
			imgBase64: '',
		})
	}

	return !loggedIn ? (
		<Paper
			elevation={6}
			sx={{
				mb: 2,
				p: 2,
				borderRadius: 4,
			}}
		>
			<Typography variant='h6' align='center'>
				Sign in to share your pet's greatest moments!
			</Typography>
		</Paper>
	) : (
		<Paper
			elevation={6}
			sx={{
				mb: 2,
				p: 2,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			<form autoComplete='off' noValidate onSubmit={handleSubmit}>
				<Typography
					variant='h6'
					align='center'
					sx={{
						mt: 2,
					}}
				>
					{currentPostId ? 'Edit your ' : 'Make a New '}Post
				</Typography>
				<TextField
					margin='normal'
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={formData.title}
					onChange={(e) =>
						setFormData({
							...formData,
							title: e.target.value,
						})
					}
				/>
				<TextField
					margin='normal'
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={formData.message}
					onChange={(e) =>
						setFormData({
							...formData,
							message: e.target.value,
						})
					}
				/>
				<TextField
					margin='normal'
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={formData.tags}
					onChange={(e) =>
						setFormData({
							...formData,
							tags: e.target.value.split(','),
						})
					}
				/>

				<Box
					sx={{
						width: '90%',
						my: 1,
					}}
				>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setFormData({
								...formData,
								imgBase64: base64,
							})
						}
					/>
				</Box>

				<Button
					variant='contained'
					size='large'
					type='submit'
					fullWidth
					sx={{
						my: 1,
					}}
				>
					Submit
				</Button>

				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={handleClear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	)
}

export default Form
