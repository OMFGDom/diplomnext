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
	sub_ids: string[] // массив строк, предположительно идентификаторы курсов
	pre_ids: string[] // массив строк, предположительно идентификаторы курсов
}

export interface ICourseDelete {
	id: string
}

export type AllCoursesResponse = ICourse[]
