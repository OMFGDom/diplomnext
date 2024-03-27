import {
	ICurriculum,
	ICurriculumCreate,
	ICurriculumDraft
} from '@/types/curriculum.types'

import { axiosWithAuth } from '@/api/interceptors'

class CurriculumService {
	private BASE_URL = 'v1/curriculum'

	async getCurriculumMain(id: string) {
		const response = await axiosWithAuth.get<ICurriculum>(
			`${this.BASE_URL}/main_curriculum_by_program?program_id=${id}&year=2024`
		)
		return response.data
	}
	async getCurriculumByProgramID(id: string) {
		const response = await axiosWithAuth.get<ICurriculumDraft>(
			`${this.BASE_URL}/get_all_curriculums_by_program?program_id=${id}`
		)
		return response.data
	}
	async createCurriculum(data: ICurriculumCreate) {
		const response = await axiosWithAuth.post<ICurriculumCreate>(
			`${this.BASE_URL}/create_curriculum`,
			data
		)
		return response.data
	}
}

export const curriculumService = new CurriculumService()
