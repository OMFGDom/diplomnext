import { AllCoursesResponse, ICourseAdd } from '@/types/course.types'

import { axiosWithAuth } from '@/api/interceptors'

class CoursesService {
	private BASE_URL = 'v1/course'

	async getAllCourses() {
		const response = await axiosWithAuth.get<AllCoursesResponse>(
			`${this.BASE_URL}/get_all_courses`
		)
		return response.data
	}
	async addCourse(course: ICourseAdd) {
		const response = await axiosWithAuth.post<ICourseAdd>(
			`${this.BASE_URL}`,
			course
		)
		return response.data
	}
	async deleteCourse(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response.data
	}
}

export const coursesService = new CoursesService()
