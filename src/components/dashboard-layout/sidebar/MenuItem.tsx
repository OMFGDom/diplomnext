import Link from 'next/link'

import { IMenuItem } from './menu.interface'

export function MenuItem({ item }: { item: IMenuItem }) {
	return (
		<div>
			<Link
				href={item.link}
				className='flex gap-[20px] items-center mb-[16px] text-[#fff] text-[15px] font-semibold leading-[22px] hover:text-[#FF0000] transition-colors duration-300 ease-in-out'
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	)
}
