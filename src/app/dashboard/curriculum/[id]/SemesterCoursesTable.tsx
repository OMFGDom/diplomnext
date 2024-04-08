import Image from 'next/image'
import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

import deleteIcon from '../../../../../public/delete.svg'

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
	onMove: (draggedId: string, hoveredId: string) => void
	onDrop: (droppedCourse: CourseEntry, semester: number) => void
	onDelete: (courseId: string) => void
	isEditing: boolean // Добавьте эту строку
}

const SemesterCoursesTable: React.FC<SemesterCoursesTableProps> = ({
	semester,
	courses,
	onMove,
	onDrop,
	onDelete,
	isEditing
}) => {
	const [, drop] = useDrop({
		accept: 'COURSE',
		drop: (item: CourseEntry) => onDrop(item, semester)
	})

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
					{courses.map((course, index) => (
						<CourseRow
							key={course.id}
							course={course}
							index={index}
							onMove={onMove}
							onDelete={onDelete}
							isEditing={isEditing} // Добавьте эту строку
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

interface CourseRowProps {
	course: CourseEntry
	index: number
	onMove: (draggedId: string, hoveredId: string) => void
	onDelete: (courseId: string) => void
	isEditing: boolean // Добавьте эту строку
}

const CourseRow: React.FC<CourseRowProps> = ({
	course,
	index,
	onMove,
	onDelete,
	isEditing
}) => {
	const [{ isDragging }, drag] = useDrag({
		type: 'COURSE',
		item: { id: course.id, index },
		canDrag: isEditing, // Добавьте эту строку
		collect: monitor => ({
			isDragging: !!monitor.isDragging()
		})
	})

	const [, drop] = useDrop({
		accept: 'COURSE',
		canDrop: () => isEditing, // Добавьте эту строку
		hover: (item: { id: string; index: number }, monitor) => {
			if (!monitor.canDrop()) return
			if (item.id === course.id) return

			const draggedIndex = item.index
			const hoveredIndex = index
			if (draggedIndex === hoveredIndex) return

			onMove(item.id, course.id)
			item.index = hoveredIndex
		}
	})

	const handleDeleteCourse = () => {
		onDelete(course.id)
	}

	return (
		<tr
			ref={node => drag(drop(node))}
			className='relative'
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			<td className='border border-gray-300 p-2'>{course.order_in_semester}</td>
			<td className='border border-gray-300 p-2'>{course.course_code}</td>
			<td className='border border-gray-300 p-2'>{course.title}</td>
			<td className='border border-gray-300 p-2'>{course.teor}</td>
			<td className='border border-gray-300 p-2'>{course.pr}</td>
			<td className='border border-gray-300 p-2'>{course.cr}</td>
			<td className='border border-gray-300 p-2'>{course.ects}</td>
			<td className='border border-gray-300 p-2'>{/* Requisites */}</td>
			<td className='border border-gray-300 p-2'>{/* Syllabus */}</td>
			{isEditing && (
				<td
					className='absolute right-[-22px] top-1/2 transform -translate-y-1/2 cursor-pointer'
					onClick={handleDeleteCourse}
				>
					<Image
						src={deleteIcon}
						alt='delete'
					/>
				</td>
			)}
		</tr>
	)
}

export default SemesterCoursesTable
