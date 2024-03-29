import {
	CirclePlus,
	History,
	NotebookPen,
	NotebookText,
	UserRound
} from 'lucide-react'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import type { IMenuItem } from './menu.interface'

export const MENU_OPERATION: IMenuItem[] = [
	{
		icon: NotebookPen,
		link: DASHBOARD_PAGES.REGISTRATION,
		name: 'Curricula Registration'
	}
]

export const MENU_INFORMATION: IMenuItem[] = [
	{
		icon: NotebookText,
		link: DASHBOARD_PAGES.REGISTRATION,
		name: 'Curricula'
	},
	{
		icon: History,
		link: DASHBOARD_PAGES.HISTORY,
		name: 'History'
	},
	{
		icon: CirclePlus,
		link: DASHBOARD_PAGES.ADDCOURSE,
		name: 'Add courses'
	}
]

export const MENU_PROFILE: IMenuItem[] = [
	{
		icon: UserRound,
		link: DASHBOARD_PAGES.REGISTRATION,
		name: 'Profile'
	}
]
