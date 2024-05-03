import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import AllCourseTable from './AllCourseTable'
import SeeExample from './SeeExample'
import UploadExcel from './UploadExcel'

export const metadata = {
	title: 'All courses',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<Heading title='All courses' />
			<div className='flex w-full h-auto p-[24px] bg-[#fff] rounded-[10px]'>
				<div className='flex flex-col w-3/5 mr-auto'>
					<AllCourseTable />
				</div>
				<div className='flex flex-col gap-4'>
					<UploadExcel />
					<SeeExample />
				</div>
			</div>
		</>
	)
}
