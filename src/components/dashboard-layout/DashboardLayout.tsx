'use client'

import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'

import styles from './DashboardLayout.module.scss'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

	useEffect(() => {
		// Получаем состояние из localStorage или устанавливаем значение по умолчанию (true)
		const savedState = localStorage.getItem('isSidebarOpen')
		setIsSidebarOpen(savedState === null ? true : JSON.parse(savedState))
	}, [])

	useEffect(() => {
		// Сохраняем состояние в localStorage при каждом изменении isSidebarOpen
		localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen))
	}, [isSidebarOpen])

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<div className={styles.DashboardLayout}>
			<Sidebar isOpen={isSidebarOpen} />

			<main className={styles.main}>
				<Header
					onToggleSidebar={toggleSidebar}
					isSidebarOpen={isSidebarOpen}
				/>
				{children}
			</main>
		</div>
	)
}
