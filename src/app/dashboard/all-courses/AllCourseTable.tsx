'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import Loader from '@/components/ui/Loader'

import { useAllCourses } from '@/hooks/useAllCourses'

import deleteIcon from '../../../../public/delete.svg'

import { coursesService } from '@/services/course.service'

export interface Course {
	id: string
	course_code: string
	title: string
	teor: string
	pr: string
	cr: string
	ects: string
	term: string
	fromAllCourses?: boolean
}

interface CourseItemProps {
	course: Course
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
	const queryClient = useQueryClient() // Используем уже существующий QueryClient
	const deleteMutation = useMutation({
		mutationKey: ['deleteCourse', course.id],
		mutationFn: () => coursesService.deleteCourse(course.id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['all courses'] }) // Теперь invalidateQueries должно срабатывать правильно
		},
		onError: error => {
			console.error('Error deleting the course:', error)
		}
	})
	const router = useRouter()

	const handleDeleteCourse = () => {
		deleteMutation.mutate()
	}

	const handleEditCourse = () => {
		router.push(`course/${course.id}`) // Используем push для навигации
	}

	return (
		<tr className='relative'>
			<td className='border border-gray-300 p-2'>{course.course_code}</td>
			<td className='border border-gray-300 p-2'>{course.title}</td>
			<td className='border border-gray-300 p-2'>{course.teor}</td>
			<td className='border border-gray-300 p-2'>{course.pr}</td>
			<td className='border border-gray-300 p-2'>{course.cr}</td>
			<td className='border border-gray-300 p-2'>{course.ects}</td>
			<td className='border border-gray-300 p-2'>{course.term}</td>
			<td
				className='absolute right-[-22px] top-1/2 transform -translate-y-1/2 cursor-pointer'
				onClick={handleDeleteCourse}
			>
				<Image
					src={deleteIcon}
					alt='delete'
				/>
			</td>
			<td
				className='absolute right-[-54px] top-1/2 transform -translate-y-1/2 cursor-pointer underline'
				onClick={handleEditCourse}
			>
				<div>Edit</div>
			</td>
		</tr>
	)
}

const AllCourseTable = () => {
	const { data: courses, isLoading } = useAllCourses()

	return isLoading ? (
		<div className='flex w-full h-max justify-center'>
			<Loader />
		</div>
	) : (
		<div className='h-full'>
			{courses ? (
				<table className='relative w-full border-collapse border border-gray-300'>
					<thead>
						<tr>
							<th className='border border-gray-300 p-2'>Course code</th>
							<th className='border border-gray-300 p-2'>Title</th>
							<th className='border border-gray-300 p-2'>Teor</th>
							<th className='border border-gray-300 p-2'>Pr</th>
							<th className='border border-gray-300 p-2'>Cr</th>
							<th className='border border-gray-300 p-2'>Ects</th>
							<th className='border border-gray-300 p-2'>Term</th>
						</tr>
					</thead>
					<tbody>
						{courses.map(course => (
							<CourseItem
								key={course.id}
								course={course}
							/>
						))}
					</tbody>
				</table>
			) : (
				<div>Courses not loaded!</div>
			)}
		</div>
	)
}

export default AllCourseTable
