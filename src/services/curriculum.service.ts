import {
	ICurriculum,
	ICurriculumById,
	ICurriculumCreate,
	ICurriculumDraft,
	UpdateCurriculum
} from '@/types/curriculum.types'

import { axiosWithAuth } from '@/api/interceptors'

class CurriculumService {
	private BASE_URL = 'v1/curriculum'

	async getCurriculumMain(id: string, year: string) {
		const response = await axiosWithAuth.get<ICurriculum>(
			`${this.BASE_URL}/main_curriculum_by_program?program_id=${id}&year=${year}`
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
	async getCurriculumByID(id: string) {
		const response = await axiosWithAuth.get<ICurriculumById>(
			`${this.BASE_URL}/get_curriculum_by_id?curriculum_id=${id}`
		)
		return response.data
	}
	async updateCurriculum(data: UpdateCurriculum, id: string) {
		const response = await axiosWithAuth.put<ICurriculumCreate>(
			`${this.BASE_URL}/update_curriculum?curriculum_id=${id}`,
			data
		)
		return response.data
	}
	async deleteCurriculum(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response.data
	}
	async getExcelCurriculum(id: string) {
		const response = await axiosWithAuth.get(
			`${this.BASE_URL}/download_curriculum?curriculum_id=${id}`,
			{ responseType: 'blob' }
		)
		return response.data
	}
	async setCurriculumAsMain(id: string) {
		const response = await axiosWithAuth.put(
			`${this.BASE_URL}/set_main_curriculum?curriculum_id=${id}`
		)
		return response.data
	}
}

export const curriculumService = new CurriculumService()
