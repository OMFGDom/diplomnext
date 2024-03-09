import type { PropsWithChildren } from 'react'

import styles from './DashboardLayout.module.scss'

import { Header } from './header/Header'
//import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className={styles.DashboardLayout}>
			<div></div>

			<main className={styles.main}>
				<Header />
				{children}
			</main>
		</div>
	)
}