import React from 'react'

import { ICourseEntry } from '@/types/curriculum.types'

interface ISemesterCoursesTableProps {
	semester: number
	courses: ICourseEntry[]
}

const SemesterCoursesTable: React.FC<ISemesterCoursesTableProps> = ({
	semester,
	courses
}) => {
	return (
		<div className='relative w-full h-max border-collapse border border-gray-300 rounded-lg'>
			<h3 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#F8A46F] text-[100px]'>
				{semester}
			</h3>
			<table className='relative w-full border-collapse border border-gray-300'>
				<thead>
					<tr>
						<th className='border border-gray-300 p-2'>Order</th>
						<th className='border border-gray-300 p-2'>Code</th>
						<th className='border border-gray-300 p-2'>Title</th>
						<th className='border border-gray-300 p-2'>Theory</th>
						<th className='border border-gray-300 p-2'>Practice</th>
						<th className='border border-gray-300 p-2'>CR</th>
						<th className='border border-gray-300 p-2'>ECTS</th>
						<th className='border border-gray-300 p-2'>Requisites</th>
						<th className='border border-gray-300 p-2'>Syllabus</th>
					</tr>
				</thead>
				<tbody>
					{courses.map(course => (
						<tr key={course.course_id}>
							<td className='border border-gray-300 p-2'>
								{course.order_in_semester}
							</td>
							<td className='border border-gray-300 p-2'>
								{course.course.course_code}
							</td>
							<td className='border border-gray-300 p-2'>
								{course.course.title}
							</td>
							<td className='border border-gray-300 p-2'>
								{course.course.teor}
							</td>
							<td className='border border-gray-300 p-2'>{course.course.pr}</td>
							<td className='border border-gray-300 p-2'>{course.course.cr}</td>
							<td className='border border-gray-300 p-2'>
								{course.course.ects}
							</td>
							<td className='border border-gray-300 p-2'>{/* Requisites */}</td>
							<td className='border border-gray-300 p-2'>{/* Syllabus */}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default SemesterCoursesTable
