export type PostsState = {
	postsArray: FetchedPostData[]
	selectedPostDetails: PostDetailsProps
	totalPages: string | null
	isLoading: boolean
	message: string | null
}

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

export type PostDetailsProps = {
	post: FetchedPostData | null
	liked: boolean | null
	likeCount: number | null
	featuresDisabled: boolean | null
}
