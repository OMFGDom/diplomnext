import { IUser, UserList } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

class UserService {
	private BASE_URL_INFO = '/v1/auth/user-info'
	private BASE_URL = '/v1/user'

	async getProfile() {
		const response = await axiosWithAuth.get<IUser>(this.BASE_URL_INFO)
		return response.data
	}

	async getAllUsers() {
		const response = await axiosWithAuth.get<UserList>(this.BASE_URL)
		return response.data
	}

	async createUser(userData: FormData) {
		const response = await axiosWithAuth.post(this.BASE_URL, userData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		return response.data
	}
	async getUserById(id: string) {
		const response = await axiosWithAuth.get<IUser>(`${this.BASE_URL}/${id}`)
		return response.data
	}
	async updateUser(id: string, userData: FormData) {
		const response = await axiosWithAuth.put(
			`${this.BASE_URL}/${id}`,
			userData,
			{
				headers: { 'Content-Type': 'multipart/form-data' }
			}
		)
		return response.data
	}
}

export const userService = new UserService()
