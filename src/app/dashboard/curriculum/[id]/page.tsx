import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import CurriculumPage from './CurriculumPage'

export const metadata = {
	title: 'Curricula',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return (
		<>
			<Heading title='Curricula' />
			<CurriculumPage />
		</>
	)
}
