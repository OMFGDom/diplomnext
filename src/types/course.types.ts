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

export interface ICourseAdd {
	title: string
	title_kz: string
	title_ru: string
	course_code: string
	teor: number
	pr: string
	cr: number
	ects: number
	term: string
	sub_ids: string[]
	pre_ids: string[]
}

export interface ICourseBulkCreate {
	title: string
	title_kz: string
	title_ru: string
	course_code: string
	teor: number
	pr: string
	cr: number
	ects: number
	term: string
	user_id: string
}

export type AllCourseBulkCreateResponse = ICourseBulkCreate[]

export interface ICourseDelete {
	id: string
}

export type AllCoursesResponse = ICourse[]

interface Prerequisite {
	title?: string
	title_kz?: string
	title_ru?: string
	course_code?: string
	teor?: number
	pr?: string
	cr?: number
	ects?: number
	term?: string | null
	user_id?: string
	id?: string
}

interface Subcourse {
	title?: string
	title_kz?: string
	title_ru?: string
	course_code?: string
	teor?: number
	pr?: string
	cr?: number
	ects?: number
	term?: string | null
	user_id?: string
	id?: string
}

export interface ICourseSingle {
	title: string
	title_kz?: string
	title_ru?: string
	course_code?: string
	teor?: number
	pr?: string
	cr?: number
	ects?: number
	term?: string | null
	prerequisites: Prerequisite[]
	subcourses: Subcourse[]
}
