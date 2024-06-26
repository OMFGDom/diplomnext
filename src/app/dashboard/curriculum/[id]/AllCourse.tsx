import { useDrag } from 'react-dnd'

import Loader from '@/components/ui/Loader'

import { useAllCourses } from '@/hooks/useAllCourses'

import cls from './AllCourse.module.scss'

export interface Course {
	id: string
	course_code: string
	title: string
	teor: string
	pr: string
	cr: string
	ects: string
	fromAllCourses?: boolean
}

interface CourseItemProps {
	course: Course
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
	const [, drag] = useDrag(() => ({
		type: 'COURSE',
		item: {
			id: course.id,
			title: course.title,
			course_code: course.course_code,
			ects: course.ects,
			teor: course.teor,
			pr: course.pr,
			cr: course.cr,
			fromAllCourses: true
		}
	}))

	return (
		<tr ref={drag}>
			<td className='border border-gray-300 p-2'>{course.course_code}</td>
			<td className='border border-gray-300 p-2'>{course.title}</td>
			<td className='border border-gray-300 p-2'>{course.teor}</td>
			<td className='border border-gray-300 p-2'>{course.pr}</td>
			<td className='border border-gray-300 p-2'>{course.cr}</td>
			<td className='border border-gray-300 p-2'>{course.ects}</td>
		</tr>
	)
}

const AllCourse = () => {
	const { data, isLoading } = useAllCourses()
	return isLoading ? (
		<div className='flex w-full h-max justify-center'>
			<Loader />
		</div>
	) : (
		<div className={cls.table}>
			{data ? (
				<table className='relative w-full border-collapse border border-gray-300'>
					<thead>
						<tr>
							<th className='border border-gray-300 p-2'>Course code</th>
							<th className='border border-gray-300 p-2'>Title</th>
							<th className='border border-gray-300 p-2'>Teor</th>
							<th className='border border-gray-300 p-2'>Pr</th>
							<th className='border border-gray-300 p-2'>Cr</th>
							<th className='border border-gray-300 p-2'>Ects</th>
						</tr>
					</thead>
					<tbody>
						{data.map(course => (
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

export default AllCourse
