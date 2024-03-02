import { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
  async main(type: 'login' | 'create_user', data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/v1/auth/${type}`,
      data
    )

    if (response.data.access_token) saveTokenStorage(response.data.access_token)

    return response
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>(
      'v1/auth/refresh-token'
    )

    if (response.data.access_token) saveTokenStorage(response.data.access_token)

    return response
  },

  async logout() {
    const response = await axiosClassic.post<boolean>('/auth/logout')

    if (response.data) removeFromStorage()

    return response
  }
}
