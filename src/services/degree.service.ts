import { DegreeList } from '@/types/degree.types'

import { axiosWithAuth } from '@/api/interceptors'

class DegreeService {
	private BASE_URL = '/v1/degree'

	async getDegreeList() {
		const response = await axiosWithAuth.get<DegreeList>(
			`${this.BASE_URL}/list_degree_by`
		)
		return response.data
	}
}

export const degreeService = new DegreeService()
