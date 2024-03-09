import { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage, saveRefreshToken, getRefreshToken } from './auth-token.service'

export const authService = {
  async main(type: 'login' | 'create_user', data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/v1/auth/${type}`,
      data
    )

    if (response.data.access_token) saveTokenStorage(response.data.access_token)
    if (response.data.refresh_token) saveRefreshToken(response.data.refresh_token)

    return response
  },

  async getNewTokens() {
    const refreshToken = getRefreshToken()
    const response = await axiosClassic.post<IAuthResponse>(
      'v1/auth/refresh-token',
      { refresh_token: refreshToken }
    )

    if (response.data.access_token) saveTokenStorage(response.data.access_token)
    if (response.data.refresh_token) saveRefreshToken(response.data.refresh_token)

    return response
  },

  async logout() {
    removeFromStorage()
  }
}
