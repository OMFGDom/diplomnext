import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import CourseForm from './CourseForm'

export const metadata: Metadata = {
	title: 'Add-course',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<div className='flex w-4/6 h-auto p-[24px] bg-[#fff] rounded-[10px] mb-[300px]'>
				<CourseForm />
			</div>
		</>
	)
}
