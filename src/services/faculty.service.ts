import { IFacultyList } from '@/types/faculty.types'

import { axiosWithAuth } from '@/api/interceptors'

class FacultyService {
	private BASE_URL = '/v1/faculty'

	async getAllFaculties() {
		const response = await axiosWithAuth.get<IFacultyList>(this.BASE_URL)
		return response.data
	}
}

export const facultyService = new FacultyService()
