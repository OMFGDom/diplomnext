// Curriculum.tsx
'use client'

import { useParams } from 'next/navigation'

import Loader from '@/components/ui/Loader'

import { useCurriculum } from '@/hooks/useCurriculum'

import SemesterCoursesTable from './SemesterCoursesTable'

// Curriculum.tsx

// Curriculum.tsx

// Curriculum.tsx

// Curriculum.tsx

// Curriculum.tsx

// Curriculum.tsx

// Curriculum.tsx

// Curriculum.tsx

// Curriculum.tsx

// Curriculum.tsx

// Curriculum.tsx

export function Curriculum() {
	const params = useParams()
	const id = params.id as string
	const { data, isLoading } = useCurriculum(id)

	return isLoading ? (
		<div className='flex w-full h-max justify-center'>
			<Loader />
		</div>
	) : (
		<div>
			{data ? (
				<div className='flex flex-col gap-[30px]'>
					<div className='flex items-center gap-[5px]'>
						<span className='font-medium text-[14px] leading-[18px] text-[#2F345C]'>
							Chosen:
						</span>
						<span className='font-bold text-[14px] leading-[18px] text-[#2F345C]'>
							{data.program_title}, {data.year}
						</span>
					</div>
					<div className='flex flex-col gap-[30px]'>
						{[...Array(data.semester_count)].map((_, index) => {
							const semester = index + 1
							const coursesInSemester = data.courses.filter(
								course => course.semester === semester
							)
							return (
								<SemesterCoursesTable
									key={semester}
									semester={semester}
									courses={coursesInSemester}
								/>
							)
						})}
					</div>
				</div>
			) : (
				<div>Curriculum not loaded!</div>
			)}
		</div>
	)
}
