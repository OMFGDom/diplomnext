import { IProgram } from '@/types/program.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProgramResponse {
	main_programs: IProgram[]
}

class ProgramService {
	private BASE_URL = 'v1/program/list_main_programs'

	async getPrograms() {
		const response = await axiosWithAuth.get<IProgramResponse>(this.BASE_URL)
		return response.data
	}
}

export const programService = new ProgramService()
