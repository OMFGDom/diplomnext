import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ProfileForm from './ProfileForm'

export const metadata: Metadata = {
	title: 'Profile',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<Heading title='Profile' />
			<div className='flex w-4/6 h-auto p-[24px] bg-[#fff] rounded-[10px] mb-[300px]'>
				<ProfileForm />
			</div>
		</>
	)
}
