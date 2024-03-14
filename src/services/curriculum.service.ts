import { ICurriculum } from '@/types/curriculum.types'

import { axiosWithAuth } from '@/api/interceptors'

class CurriculumService {
	private BASE_URL = 'v1/curriculum/main_curriculum_by_program'

	async getCurriculum(id: string) {
		const response = await axiosWithAuth.get<ICurriculum>(
			`${this.BASE_URL}?program_id=${id}&year=2024`
		)
		return response.data
	}
}

export const curriculumService = new CurriculumService()
