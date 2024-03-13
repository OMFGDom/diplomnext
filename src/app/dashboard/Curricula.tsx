'use client'

import Link from 'next/link'

import Loader from '@/components/ui/Loader'

import { useProgram } from '@/hooks/useProgram'

export function Curricula() {
	const { data, isLoading } = useProgram()

	return isLoading ? (
		<div className='flex w-full h-max justify-center'>
			<Loader />
		</div>
	) : (
		<div className='w-full h-max border-collapse border border-gray-300 rounded-lg'>
			{data?.main_programs.length ? (
				<table className='w-full'>
					<thead>
						<tr>
							<th className='border border-gray-300 p-2'>#</th>
							<th className='border border-gray-300 p-2'>Code</th>
							<th className='border border-gray-300 p-2'>Department Title</th>
						</tr>
					</thead>
					<tbody>
						{data.main_programs.map((program, index) => (
							<tr
								key={program.id}
								className='hover:bg-gray-100'
							>
								<td className='border border-gray-300 p-2'>{index + 1}</td>
								<td className='border border-gray-300 p-2'>{program.code}</td>
								<td className='border border-gray-300 p-2'>
									<Link
										href={`/program/${program.id}`}
										passHref
									>
										{program.title}
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div>Curricula not loaded!</div>
			)}
		</div>
	)
}
