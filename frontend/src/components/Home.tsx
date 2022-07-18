import React, { ChangeEvent, SyntheticEvent, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks/rtkHooks'
import { useParams, useNavigate } from 'react-router-dom'
import { searchPosts } from '../features/posts/postsSlice'
import { toast } from 'react-toastify'
import Posts from './Posts'
import Form from './Form'
import {
	Grid,
	Paper,
	Pagination,
	PaginationItem,
	AppBar,
	TextField,
	Chip,
	Autocomplete,
	Button,
} from '@mui/material'

function Home() {
	const toastOptions = {
		autoClose: 4000,
		position: toast.POSITION.BOTTOM_RIGHT,
	}

	const [currentPostId, setCurrentPostId] = useState(null)

	//	post search state
	const [searchTags, setSearchTags] = useState<any[]>([])
	const [searchString, setSearchString] = useState('')
	const [currentSearchTag, setCurrentSearchTag] = useState('')

	//	pagination state
	const { page } = useParams()
	const [currentPage, setCurrentPage] = useState(
		page !== undefined ? page : String(1)
	)
	const totalPages = useAppSelector((state) => state.posts?.totalPages)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const tagsRef = useRef(null)

	return (
		<Grid
			container
			justifyContent='space-between'
			alignItems='stretch'
			spacing={3}
			sx={{
				p: 2,
			}}
		>
			<Grid item xs={12} lg={9}>
				<Posts setCurrentPostId={setCurrentPostId} page={currentPage} />
			</Grid>

			<Grid item xs={12} lg={3}>
				{/* pagination */}
				<Paper
					elevation={6}
					sx={{
						mb: 2,
						p: 2,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Pagination
						count={totalPages ? parseInt(totalPages) : 5}
						page={parseInt(currentPage)}
						color='secondary'
						renderItem={(item) => <PaginationItem {...item} />}
						onChange={(e: ChangeEvent<any>) => {
							setCurrentPage(e.target.innerText)
							navigate(`/posts/page${e.target.innerText}`)
						}}
					/>
				</Paper>

				{/* search area */}
				<Paper
					elevation={6}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						p: 2,
						mb: 2,
					}}
				>
					<AppBar
						position='static'
						color='inherit'
						sx={{
							borderRadius: 1,
							mb: 2,
							boxShadow: 'none',
						}}
					>
						<TextField
							name='search'
							label='Filter by post content'
							fullWidth
							value={searchString}
							onChange={(e) => {
								e.preventDefault()
								setSearchString(e.target.value)
							}}
						/>
					</AppBar>
					<Autocomplete
						multiple
						id='tagsSearch'
						options={[]}
						value={searchTags}
						inputValue={currentSearchTag}
						onInputChange={(e: SyntheticEvent<Element>) => {
							const target = e.target as HTMLInputElement
							if (!/[\w]/i.test(target.value))
								return toast.error(
									'Sorry, no empty whitespace tags allowed!  Please try again',
									toastOptions
								)
							if (target.value && target.value.match(/\s/)) {
								setSearchTags([
									...searchTags,
									target.value.trim(),
								])
								setCurrentSearchTag('')
							} else {
								setCurrentSearchTag(target.value)
							}
						}}
						freeSolo
						size='small'
						onChange={(e, value) => {
							e.preventDefault()
							setSearchTags(value)
							setCurrentSearchTag('')
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
									ref={tagsRef}
									variant='outlined'
									label='Filter by tags'
									placeholder='e.g. Dogs'
								/>
							)
						}}
					/>
					<Button
						onClick={(e) => {
							e.preventDefault()
							;(!searchString.trim().length &&
								!searchTags.length) ||
							searchString.match(/[^a-zA-Z\s']/)
								? toast.error(
										'Error: Query or tags not provided - please enter one or both to search.',
										toastOptions
								  )
								: searchString.trim().length &&
								  !searchTags.length
								? dispatch(
										searchPosts({
											query: searchString.trim(),
										})
								  )
								: dispatch(
										searchPosts({
											query: searchString.trim(),
											tags: searchTags,
										})
								  )
						}}
						sx={{
							mt: 2,
						}}
					>
						Search
					</Button>
				</Paper>
				<Form
					currentPostId={currentPostId ?? ''}
					setCurrentPostId={setCurrentPostId}
				/>
			</Grid>
		</Grid>
	)
}

export default Home
