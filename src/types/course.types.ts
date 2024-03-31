export interface ICourse {
	title: string
	course_code: string
	teor: string
	pr: string
	cr: string
	ects: string
	term: string
	user_id: string
	id: string
}

export type AllCoursesResponse = ICourse[]
