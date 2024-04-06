'use client'

import { useState } from 'react'

import AllCourse from './AllCourse'
import { Curriculum } from './Curriculum'

export default function CurriculumPage() {
	const [showAllCourses, setShowAllCourses] = useState(false)

	return (
		<>
			<div className='flex gap-[25px] w-full'>
				<div className='flex flex-col w-4/6 h-auto p-[24px] bg-[#fff] rounded-[10px]'>
					<Curriculum onEditToggle={() => setShowAllCourses(!showAllCourses)} />
				</div>
				<div className='flex flex-col h-auto p-[24px]'>
					{showAllCourses && <AllCourse />}
				</div>
			</div>
		</>
	)
}
