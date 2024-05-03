import {
	AllCourseBulkCreateResponse,
	AllCoursesResponse,
	ICourseAdd,
	ICourseSingle
} from '@/types/course.types'

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
	async updateCourse(course: ICourseAdd, id: string) {
		const response = await axiosWithAuth.put<ICourseAdd>(
			`${this.BASE_URL}/${id}`,
			course
		)
		return response.data
	}
	async getCourseById(id: string) {
		const response = await axiosWithAuth.get<ICourseSingle>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}
	async uploadExcel(formData: FormData) {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}

		const response = await axiosWithAuth.post<AllCourseBulkCreateResponse>(
			`${this.BASE_URL}/upload_excel`,
			formData,
			config
		)
		return response.data
	}

	async bulkCreateCourse(course: AllCourseBulkCreateResponse) {
		const response = await axiosWithAuth.post(
			`${this.BASE_URL}/bulk_create`,
			course
		)
		return response.data
	}
	async exampleExcel() {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/example_excel`)
		return response.data
	}
}

export const coursesService = new CoursesService()
