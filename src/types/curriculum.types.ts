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

export interface ICurriculumCreate {
	title: string
	program_id: string
}

interface ICurriculumUser {
	id: string
	first_name: string
	last_name: string
}

interface ICurriculumItem {
	title: string
	year: string
	program_id: string
	id: string
	is_main: boolean
	created_by: string
	user: ICurriculumUser
	program_title: string
	degree_name: string
}

interface ICurriculumProgram {
	degree_name: string
	program_title: string
}

export interface ICurriculumDraft {
	curriculums: ICurriculumItem[]
	program: ICurriculumProgram
}
