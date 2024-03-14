export interface ICourse {
	course_code: string
	pr: string
	ects: string
	user_id: string
	title: string
	id: string
	teor: string
	cr: string
	term: string
}

export interface ICourseEntry {
	curriculum_id: string
	order_in_semester: number
	semester: number
	course_id: string
	course: ICourse
}

export interface ICurriculum {
	id: string
	is_main: boolean
	created_by: string
	title: string
	year: string
	program_id: string
	courses: ICourseEntry[]
	program_title: string
	semester_count: number
}
