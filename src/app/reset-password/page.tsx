import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ResetPassword } from './ResetPassword'
import {Suspense} from "react";

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return <Suspense fallback={'loading...'}><ResetPassword /></Suspense>
}
