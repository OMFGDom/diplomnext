import { IAuthForm, IAuthResponse, IResetPassword } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import {
	getRefreshToken,
	removeFromStorage,
	saveRefreshToken,
	saveTokenStorage
} from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'create_user', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/v1/auth/${type}`,
			data
		)

		if (response.data.access_token) saveTokenStorage(response.data.access_token)
		if (response.data.refresh_token)
			saveRefreshToken(response.data.refresh_token)

		return response
	},

	async getNewTokens() {
		const refreshToken = getRefreshToken()
		const response = await axiosClassic.post<IAuthResponse>(
			'v1/auth/refresh-token',
			{ refresh_token: refreshToken }
		)

		if (response.data.access_token) saveTokenStorage(response.data.access_token)
		if (response.data.refresh_token)
			saveRefreshToken(response.data.refresh_token)

		return response
	},

	async logout() {
		removeFromStorage()
	},

	async resetPasswordRequest(email: string) {
		return axiosClassic.post('v1/auth/password/reset/request/', { email })
	},
	async resetPassword(data: IResetPassword, token: string) {
		return axiosClassic.post('v1/auth/password/reset/new_password/', data, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	},
	async resetValidate(token: string) {
		return axiosClassic.post(
			`v1/auth/password/reset/validate/`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
	}
}
