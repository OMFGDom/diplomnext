'use client'

import Image from 'next/image'

import Loader from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

import ProfileImage from '../../../../../public/profile.png'

import styles from './Profile.module.scss'

export function Profile() {
	const { data, isLoading } = useProfile()

	return (
		<div className={styles.profile}>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.profile__info}>
					<p>
						{data?.first_name || 'Пользователь'} {data?.last_name || '1'}
					</p>
					<div className='w-[40px] h-[40px] rounded-full'>
						<Image
							src={data?.profile_image || ProfileImage}
							alt='profile'
							width={40}
							height={40}
							className='rounded-full w-[40px] h-[40px] object-cover'
						/>
					</div>
				</div>
			)}
		</div>
	)
}
