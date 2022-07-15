export type UserState = {
	currentUser: UserData | null
	isLoading: boolean
	message: string | null
}

export type UserData = {
	_id: string
	name: string
	email: string
	token: string
	admin: boolean
}

export type RegisterData = {
	name: string
	email: string
	password: string
}

export type LoginData = {
	email: string
	password: string
}
