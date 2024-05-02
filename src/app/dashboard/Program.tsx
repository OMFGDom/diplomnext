'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import Loader from '@/components/ui/Loader'

import { useProgram } from '@/hooks/useProgram'

export function Program() {
	const [selectedYear, setSelectedYear] = useState(2024)

	const { data, isLoading } = useProgram(selectedYear)

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedYear(Number(e.target.value))
	}

	return (
		<div className='w-full'>
			<div className='flex items-center mb-10'>
				<label
					htmlFor='year-select'
					className='mr-2'
				>
					Chosen:
				</label>
				<select
					id='year-select'
					value={selectedYear}
					onChange={handleYearChange}
					className='p-2 bg-gray-200 rounded-md'
				>
					{[2019, 2020, 2021, 2022, 2023, 2024].map(year => (
						<option
							key={year}
							value={year}
						>
							{year}
						</option>
					))}
				</select>
			</div>

			{isLoading ? (
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
									<th className='border border-gray-300 p-2'>
										Department Title
									</th>
								</tr>
							</thead>
							<tbody>
								{data.main_programs.map((program, index) => (
									<tr
										key={program.id}
										className='hover:bg-gray-100'
									>
										<td className='border border-gray-300 p-2'>{index + 1}</td>
										<td className='border border-gray-300 p-2'>
											{program.code}
										</td>
										<td className='border border-gray-300 p-2'>
											<Link
												href={`/dashboard/program/${program.id}?year=${selectedYear}`}
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
						<div>Program not loaded!</div>
					)}
				</div>
			)}
		</div>
	)
}
