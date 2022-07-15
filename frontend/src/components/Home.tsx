import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks/rtkHooks'
import { searchPosts } from '../features/posts/postsSlice'
import { useParams, useNavigate } from 'react-router-dom'
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
							setCurrentSearchTag(target.value)
						}}
						freeSolo
						size='small'
						onChange={(e, value) => {
							e.preventDefault()
							console.log(value)
							if (!value.some((tag) => tag.match(/\s/g))) {
								setSearchTags(value)
								setCurrentSearchTag('')
							} else return console.log('no whitespace!')
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
								? console.log('nothing to see here folks')
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
