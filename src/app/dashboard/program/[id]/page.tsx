import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Curriculum } from './Curriculum'

export const metadata: Metadata = {
	title: 'Curricula',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<Heading title='Curricula' />
			<div className='flex w-4/6 h-auto p-[24px] bg-[#fff] rounded-[10px]'>
				<Curriculum />
			</div>
		</>
	)
}
