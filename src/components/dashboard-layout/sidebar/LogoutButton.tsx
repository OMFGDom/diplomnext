'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'

export function LogoutButton() {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	return (
		<div className='flex'>
			<button
				className='flex items-center gap-[20px] border-[1px] border-solid border-[#FF0000] rounded-[16px] px-[32px] py-[10px] hover:opacity-80 transition-opacity duration-300'
				onClick={() => mutate()}
			>
				<LogOut
					size={20}
					color='#FF0000'
				/>
				<span className='block text-[13px] leading-[18px] text-[#FF0000]'>
					Log out
				</span>
			</button>
		</div>
	)
}
