'use client'

import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'

import styles from './DashboardLayout.module.scss'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	// Устанавливаем начальное состояние в null, чтобы отличать неинициализированное состояние
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean | null>(null)

	useEffect(() => {
		const savedState = localStorage.getItem('isSidebarOpen')
		// Устанавливаем состояние в зависимости от сохраненного значения или true по умолчанию
		setIsSidebarOpen(savedState !== null ? JSON.parse(savedState) : true)
	}, [])

	useEffect(() => {
		if (isSidebarOpen !== null) {
			// Сохраняем состояние в localStorage при каждом изменении isSidebarOpen, кроме начального null
			localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen))
		}
	}, [isSidebarOpen])

	const toggleSidebar = () => {
		setIsSidebarOpen(prevState => !prevState)
	}

	// Отображаем компонент только после инициализации состояния
	if (isSidebarOpen === null) {
		return null
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
