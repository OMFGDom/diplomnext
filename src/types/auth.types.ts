export interface IAuthForm {
	email: string
	password: string
}

export interface IUser {
	id: string
	email: string
	first_name: string
	last_name: string
	profile_image: string
	created_at: string
	last_login_at: string
	is_active: boolean
	is_superuser: boolean
	faculty_id: string
}

interface IFaculty {
	title: string
	logo: string
	id: string
}

interface IUserItem {
	first_name: string
	last_name: string
	email: string
	profile_image: string
	datetime_created: string
	last_login_at: string
	is_active: boolean
	is_superuser: boolean
	faculty_id: string
	id: string
	faculty: IFaculty
}

export type UserList = IUserItem[]

export interface IAuthResponse {
	access_token: string
	refresh_token: string
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }

export interface ICreateUser {
	email: string
	first_name: string
	last_name: string
	password: string
	last_login_at: string
	is_active: boolean
	is_superuser: boolean
	faculty_id: string
	profile_image: string
}
