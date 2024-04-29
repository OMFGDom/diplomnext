'use client'

import Link from 'next/link'
import React from 'react'

import { useAllUsers } from '@/hooks/useAllUsers'

const UserList: React.FC = () => {
	const { data: users, isLoading, isSuccess } = useAllUsers()

	if (isLoading) return <div>Loading...</div>
	if (!isSuccess || !users) return <div>No users found</div>

	return (
		<ol className='space-y-2 p-4'>
			{users.map((user, index) => (
				<li key={user.id}>
					<Link
						href={`/user/${user.id}`}
						className=''
					>
						{index + 1}.{' '}
						<span className='text-[#2F345C] underline'>
							{user.first_name} {user.last_name}{' '}
						</span>
						<span className='text-[#2F345C] underline font-semibold'>
							({user.faculty.title})
						</span>
					</Link>
				</li>
			))}
		</ol>
	)
}

export default UserList
