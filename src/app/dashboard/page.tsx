import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Curricula } from './Curricula'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<Heading title='Curricula' />
			<div className='flex w-3/5 h-auto p-[24px] bg-[#fff] rounded-[10px]'>
				<Curricula />
			</div>
		</>
	)
}
