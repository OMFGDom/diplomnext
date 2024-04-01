import React from 'react'
import { useDrag } from 'react-dnd'

import { CourseEntry } from './SemesterCoursesTable'

interface CourseRowProps {
	course: CourseEntry
	semester: number
}

const CourseRow: React.FC<CourseRowProps> = ({ course, semester }) => {
	const [, drag] = useDrag(() => ({
		type: 'COURSE',
		item: { ...course, originalSemester: semester }
	}))

	return (
		<tr ref={drag}>
			<td className='border border-gray-300 p-2'>{course.order_in_semester}</td>
			<td className='border border-gray-300 p-2'>{course.course_code}</td>
			<td className='border border-gray-300 p-2'>{course.title}</td>
			<td className='border border-gray-300 p-2'>{course.teor}</td>
			<td className='border border-gray-300 p-2'>{course.pr}</td>
			<td className='border border-gray-300 p-2'>{course.cr}</td>
			<td className='border border-gray-300 p-2'>{course.ects}</td>
			<td className='border border-gray-300 p-2'>{/* Requisites */}</td>
			<td className='border border-gray-300 p-2'>{/* Syllabus */}</td>
		</tr>
	)
}

export default CourseRow
