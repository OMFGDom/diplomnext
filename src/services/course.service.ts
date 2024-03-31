import { AllCoursesResponse } from '@/types/course.types'

import { axiosWithAuth } from '@/api/interceptors'

class CoursesService {
	private BASE_URL = 'v1/course'

	async getAllCourses() {
		const response = await axiosWithAuth.get<AllCoursesResponse>(
			`${this.BASE_URL}/get_all_courses`
		)
		return response.data
	}
}

export const coursesService = new CoursesService()
