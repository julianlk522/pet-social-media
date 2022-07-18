import React, {
	useState,
	useEffect,
	FormEvent,
	SyntheticEvent,
	Dispatch,
} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks/rtkHooks'
import { useAuthStatus } from '../app/hooks/useAuthStatus'
import { createPost, updatePost } from '../features/posts/postsSlice'
import { toast } from 'react-toastify'
import FileBase from 'react-file-base64'
import {
	TextField,
	Button,
	Typography,
	Paper,
	Box,
	Autocomplete,
	Chip,
} from '@mui/material'

type FormProps = {
	currentPostId: string
	setCurrentPostId: Dispatch<any>
}

function Form({ currentPostId, setCurrentPostId }: FormProps) {
	const toastOptions = {
		autoClose: 4000,
		position: toast.POSITION.BOTTOM_RIGHT,
	}

	type FormData = {
		title: string
		message: string
		tags: any[]
		imgBase64?: string | undefined
	}

	type FileBaseProps = {
		base64: string
	}

	const [formData, setFormData] = useState<FormData>({
		title: '',
		message: '',
		tags: [],
		imgBase64: '',
	})

	//	tags input state
	const [currentNewTag, setCurrentNewTag] = useState('')

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
		clearFormData()
	}

	const clearFormData = () => {
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
				{/* <TextField
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
				/> */}
				<Autocomplete
					multiple
					id='tagsInput'
					options={[]}
					value={formData.tags}
					inputValue={currentNewTag}
					onInputChange={(e: SyntheticEvent<Element>) => {
						const target = e.target as HTMLInputElement
						if (!/[\w]/i.test(target.value))
							return toast.error(
								'Sorry, no empty whitespace tags allowed!  Please try again',
								toastOptions
							)
						if (target.value && target.value.match(/\s/)) {
							setFormData({
								...formData,
								tags: [...formData.tags, target.value.trim()],
							})
							setCurrentNewTag('')
						} else {
							setCurrentNewTag(target.value)
						}
					}}
					freeSolo
					size='small'
					onChange={(e, value) => {
						e.preventDefault()
						setFormData({
							...formData,
							tags: value,
						})
						setCurrentNewTag('')
					}}
					renderTags={(value, getTagProps) =>
						value.map((option, index) => (
							<Chip
								variant='outlined'
								label={option}
								{...getTagProps({ index })}
								key={index}
							/>
						))
					}
					renderInput={(params) => {
						return (
							<TextField
								{...params}
								variant='outlined'
								label='Tags'
							/>
						)
					}}
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
						onDone={({ base64 }: FileBaseProps) =>
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
					onClick={clearFormData}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	)
}

export default Form
