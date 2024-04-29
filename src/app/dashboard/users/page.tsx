import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import UserList from './UserList'

export const metadata = {
	title: 'Users',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<Heading title='Users' />
			<div className='flex flex-col w-full h-auto p-[24px] bg-[#fff] rounded-[10px]'>
				<UserList />
			</div>
		</>
	)
}
