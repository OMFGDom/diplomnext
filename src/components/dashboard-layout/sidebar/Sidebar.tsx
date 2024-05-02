'use client'

import Image from 'next/image'
import Link from 'next/link'

import SidebarImage from '../../../../public/sidebar.png'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import {
	MENU_ADMIN,
	MENU_INFORMATION,
	MENU_OPERATION,
	MENU_PROFILE
} from './menu.data'

interface SidebarProps {
	isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
	return (
		<aside
			className={
				isOpen
					? 'w-[375px] py-[25px] px-[20px] bg-[#1F2150] transition-width duration-300'
					: 'w-[0px] transition-width duration-300'
			}
		>
			<div>
				<Link
					href='/dashboard'
					className='flex items-center justify-center mb-[25px]'
				>
					<Image
						src={SidebarImage}
						alt='sidebar'
						width={245}
						height={70}
						priority={true}
					/>
				</Link>
				<div className='grid grid-cols-1 gap-[50px]'>
					<div className='flex flex-col'>
						<span className='block mb-[20px] font-light text-[15px] leading[22px] text-[#fff]'>
							ACADEMIC OPERATIONS
						</span>
						{MENU_OPERATION.map(item => (
							<MenuItem
								item={item}
								key={item.link}
							/>
						))}
					</div>
					<div className='flex flex-col'>
						<span className='block mb-[20px] font-light text-[15px] leading[22px] text-[#fff]'>
							INFORMATION
						</span>
						{MENU_INFORMATION.map(item => (
							<MenuItem
								item={item}
								key={item.link}
							/>
						))}
					</div>
					<div className='flex flex-col'>
						<span className='block mb-[20px] font-light text-[15px] leading[22px] text-[#fff]'>
							PROFILE
						</span>
						{MENU_PROFILE.map(item => (
							<MenuItem
								item={item}
								key={item.link}
							/>
						))}
					</div>
					<div className='flex flex-col'>
						<span className='block mb-[20px] font-light text-[15px] leading[22px] text-[#fff]'>
							ADMIN
						</span>
						{MENU_ADMIN.map(item => (
							<MenuItem
								item={item}
								key={item.link}
							/>
						))}
						<div className='mt-10'>
							<LogoutButton />
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}
