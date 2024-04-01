import React from 'react'
import { useDrop } from 'react-dnd'

export interface CourseEntry {
	id: string
	course_code: string
	title: string
	teor: string
	pr: string
	cr: string
	ects: string
	order_in_semester: number
}

interface SemesterCoursesTableProps {
	semester: number
	courses: CourseEntry[]
	onDrop: (droppedCourse: CourseEntry, semester: number) => void // Измененный тип
}

const SemesterCoursesTable: React.FC<SemesterCoursesTableProps> = ({
	semester,
	courses,
	onDrop
}) => {
	const [, drop] = useDrop(() => ({
		accept: 'COURSE',
		drop: (item: CourseEntry) => onDrop(item, semester), // Используйте весь объект курса
		collect: monitor => ({
			isOver: !!monitor.isOver()
		})
	}))

	return (
		<div
			ref={drop}
			className='relative w-full h-max border-collapse border border-gray-300 rounded-lg'
		>
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
						<tr key={course.id}>
							<td className='border border-gray-300 p-2'>
								{course.order_in_semester}
							</td>
							<td className='border border-gray-300 p-2'>
								{course.course_code}
							</td>
							<td className='border border-gray-300 p-2'>{course.title}</td>
							<td className='border border-gray-300 p-2'>{course.teor}</td>
							<td className='border border-gray-300 p-2'>{course.pr}</td>
							<td className='border border-gray-300 p-2'>{course.cr}</td>
							<td className='border border-gray-300 p-2'>{course.ects}</td>
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