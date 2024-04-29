import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import AllCourseTable from './AllCourseTable'

export const metadata = {
	title: 'All courses',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<Heading title='Elective courses' />
			<div className='flex flex-col w-full h-auto p-[24px] bg-[#fff] rounded-[10px]'>
				<div className='flex flex-col w-3/5'>
					<AllCourseTable />
				</div>
			</div>
		</>
	)
}
