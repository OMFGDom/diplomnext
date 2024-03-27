import { IProgram } from '@/types/program.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProgramResponse {
	main_programs: IProgram[]
}

type IProgramByIDResponse = IProgram[]

class ProgramService {
	private BASE_URL = 'v1/program'

	async getMainPrograms() {
		const response = await axiosWithAuth.get<IProgramResponse>(
			`${this.BASE_URL}/list_main_programs`
		)
		return response.data
	}
	async getProgramsByID(program_id: string) {
		const response = await axiosWithAuth.get<IProgramByIDResponse>(
			`${this.BASE_URL}/list_programs_by?degree_id=${program_id}`
		)
		return response.data
	}
}

export const programService = new ProgramService()
