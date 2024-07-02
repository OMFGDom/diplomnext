import Cookies from 'js-cookie'

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: 'curriculum-crafter.me',
    sameSite: 'strict',
    expires: 1
  })
}

export const getRefreshToken = () => {
  const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)
  return refreshToken || null
}

export const saveRefreshToken = (refreshToken: string) => {
  Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
    domain: 'curriculum-crafter.me',
    sameSite: 'strict',
    expires: 3
  })
}

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
  Cookies.remove(EnumTokens.REFRESH_TOKEN)
}
