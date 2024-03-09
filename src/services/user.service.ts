import { IUser, TypeUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

class UserService {
  private BASE_URL = '/v1/auth/user-info'

  async getProfile() {
    const response = await axiosWithAuth.get<IUser>(this.BASE_URL)
    return response.data
  }

  async update(data: TypeUserForm) {
    const response = await axiosWithAuth.put(this.BASE_URL, data)
    return response.data
  }
}

export const userService = new UserService()