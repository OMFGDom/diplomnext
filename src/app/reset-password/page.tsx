import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ResetPassword } from './ResetPassword'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return (
		<Suspense fallback={'loading...'}>
			<ResetPassword />
		</Suspense>
	)
}
