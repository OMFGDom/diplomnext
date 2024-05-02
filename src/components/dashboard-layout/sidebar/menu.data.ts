import {
	BadgePlus,
	CirclePlus,
	GalleryVerticalEnd,
	NotebookPen,
	NotebookText,
	UserRound,
	Users
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
		link: DASHBOARD_PAGES.HOME,
		name: 'Curricula'
	},
	// {
	// 	icon: History,
	// 	link: DASHBOARD_PAGES.HISTORY,
	// 	name: 'History'
	// },
	{
		icon: GalleryVerticalEnd,
		link: DASHBOARD_PAGES.ALLCOURSES,
		name: 'ALL Courses'
	},
	{
		icon: CirclePlus,
		link: DASHBOARD_PAGES.ADDCOURSE,
		name: 'Add courses'
	}
	// {
	// 	icon: Users,
	// 	link: DASHBOARD_PAGES.USERS,
	// 	name: 'Users'
	// },
	// {
	// 	icon: BadgePlus,
	// 	link: DASHBOARD_PAGES.ADDUSER,
	// 	name: 'Add User'
	// }
]

export const MENU_PROFILE: IMenuItem[] = [
	{
		icon: UserRound,
		link: DASHBOARD_PAGES.REGISTRATION,
		name: 'Profile'
	}
]

export const MENU_ADMIN: IMenuItem[] = [
	{
		icon: Users,
		link: DASHBOARD_PAGES.USERS,
		name: 'Users'
	},
	{
		icon: BadgePlus,
		link: DASHBOARD_PAGES.ADDUSER,
		name: 'Add User'
	}
]
