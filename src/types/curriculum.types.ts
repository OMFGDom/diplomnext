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

interface ICurriculumByIdCourse {
	id: string
	title: string
	teor: string
	cr: string
	term?: string
	course_code: string
	pr: string
	ects: string
	user_id?: string
}

interface ICurriculumByIdCourses {
	semester: number
	course_id: string
	curriculum_id: string
	order_in_semester: number
	course: ICurriculumByIdCourse
}

export interface ICurriculumById {
	title: string
	year: string
	program_id: string
	id: string
	is_main: boolean
	created_by: string
	courses: ICurriculumByIdCourses[]
	user: User
	program_title: string
	semester_count: number
	degree_name: string
}

interface User {
	id: string
	profile_image: string
	last_login_at: string
	is_superuser: boolean
	first_name: string
	last_name: string
	email: string
	created_at: string
	is_active: boolean
	faculty_id: string
}

type UpdateCurriculumItem = {
	course_id: string
	semester: number
	curriculum_id: string
	order_in_semester: number
}

export type UpdateCurriculum = UpdateCurriculumItem[]
