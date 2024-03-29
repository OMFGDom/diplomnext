'use client'

import Image from 'next/image'

import logo from '../../../../public/logo.png'

import styles from './Header.module.scss'
import { Profile } from './profile/Profile'

interface HeaderProps {
	onToggleSidebar: () => void
	isSidebarOpen: boolean
}

export function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
	return (
		<header className={styles.header}>
			<div className={styles.header__logo}>
				<Image
					src={logo}
					alt='logo'
					width={37}
					height={44}
				/>
			</div>
			<div className={styles.header__main}>
				<div
					className={`${styles.header__btn} ${isSidebarOpen ? 'rotate-[0deg]' : 'rotate-[180deg]'}`}
					onClick={onToggleSidebar}
				>
					<svg
						width='25'
						height='25'
						viewBox='0 0 25 25'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M11.4904 4.91601C11.563 4.98857 11.6206 5.07474 11.6599 5.16958C11.6993 5.26442 11.7195 5.36608 11.7195 5.46875C11.7195 5.57142 11.6993 5.67308 11.6599 5.76792C11.6206 5.86277 11.563 5.94893 11.4904 6.02148L5.79212 11.7188L21.0939 11.7188C21.3011 11.7188 21.4998 11.8011 21.6463 11.9476C21.7928 12.0941 21.8751 12.2928 21.8751 12.5C21.8751 12.7072 21.7928 12.9059 21.6463 13.0524C21.4998 13.1989 21.3011 13.2813 21.0939 13.2813L5.79212 13.2813L11.4904 18.9785C11.637 19.1251 11.7193 19.3239 11.7193 19.5313C11.7193 19.7386 11.637 19.9374 11.4904 20.084C11.3438 20.2306 11.1449 20.3129 10.9376 20.3129C10.7303 20.3129 10.5315 20.2306 10.3849 20.084L3.35364 13.0527C3.281 12.9802 3.22338 12.894 3.18406 12.7992C3.14475 12.7043 3.12451 12.6027 3.12451 12.5C3.12451 12.3973 3.14475 12.2957 3.18406 12.2008C3.22338 12.106 3.281 12.0198 3.35364 11.9473L10.3849 4.91601C10.4574 4.84338 10.5436 4.78575 10.6385 4.74644C10.7333 4.70712 10.835 4.68689 10.9376 4.68689C11.0403 4.68689 11.142 4.70712 11.2368 4.74644C11.3316 4.78575 11.4178 4.84338 11.4904 4.91601Z'
							fill='#1F2150'
						/>
					</svg>
				</div>
				<Profile />
			</div>
		</header>
	)
}
