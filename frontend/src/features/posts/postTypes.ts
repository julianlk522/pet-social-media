export type FetchedPostData = {
	_id: string
	title: string
	message: string
	tags: string[]
	imgBase64?: string
	creator: string
	likes?: string[]
	createdAt: string | Date
}

export type NewPostData = {
	title: string
	message: string
	tags: string[]
	imgBase64?: string
	creator: string
}

export type PostsState = {
	postsArray: FetchedPostData[]
	selectedPost: number | null
	totalPages: string | number | null
	isError: boolean
	isSuccess: boolean
	isLoading: boolean
	message: string | null
}
