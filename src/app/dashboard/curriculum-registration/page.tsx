import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import TemplateSelector from './TemplateSelector'

export const metadata: Metadata = {
	title: 'Curriculum Registration',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<Heading title='Curriculum Registration' />
			<div className='flex w-3/5 h-auto p-[24px] bg-[#fff] rounded-[10px]'>
				<div className='flex flex-col'>
					<div className='flex items-center mb-[45px]'>
						<div className='font-medium text-[#2F345C] mr-[5px]'>Status:</div>
						<div className='font-semibold text-[18px] text-[#00C308]'>
							open til 14 May, 2024
						</div>
					</div>
					<TemplateSelector />
				</div>
			</div>
		</>
	)
}
