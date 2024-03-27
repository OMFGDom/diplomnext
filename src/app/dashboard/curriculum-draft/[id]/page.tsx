import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { CurriculumDraft } from './CurriculumDraft'

export const metadata: Metadata = {
	title: 'Curriculum Registration',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<Heading title='Curriculum Registration' />
			<div className='flex flex-col w-full h-auto p-[24px] bg-[#fff] rounded-[10px]'>
				<CurriculumDraft />
			</div>
		</>
	)
}
