import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'

import { useCurriculumById } from '@/hooks/useCurriculumById'
import { useCurriculumUpdate } from '@/hooks/useCurriculumUpdate'

import SemesterCoursesTable from './SemesterCoursesTable'

export interface Course {
	id: string
	course_code: string
	title: string
	teor: string
	pr: string
	cr: string
	ects: string
}

interface ICurriculumProps {
	onEditToggle: () => void
}

interface IUpdatedCourse {
	course_id: string
	semester: number
	curriculum_id: string
	order_in_semester: number
}

export function Curriculum({ onEditToggle }: ICurriculumProps) {
	const params = useParams()
	const id = params.id as string
	const { data, isLoading } = useCurriculumById(id)
	const { mutate: updateCurriculum } = useCurriculumUpdate()
	const [updatedCourses, setUpdatedCourses] = useState<IUpdatedCourse[]>([])
	const [localData, setLocalData] = useState(data)
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		if (data) {
			setLocalData(data)
			const initialUpdatedCourses = data.courses.map(course => ({
				course_id: course.course_id,
				semester: course.semester,
				curriculum_id: course.curriculum_id,
				order_in_semester: course.order_in_semester
			}))
			setUpdatedCourses(initialUpdatedCourses)
		}
	}, [data])

	const onDrop = (droppedCourse: Course, semester: number) => {
		setLocalData(prevData => {
			if (!prevData) return prevData

			const courseExists = prevData.courses.some(
				curriculumCourse => curriculumCourse.course.id === droppedCourse.id
			)

			if (courseExists) {
				toast.error('The course is already in the curriculum')
				return prevData
			}

			const coursesInSemester = prevData.courses.filter(
				course => course.semester === semester
			)
			const orderInSemester = coursesInSemester.length + 1

			const newCourse = {
				course_id: droppedCourse.id,
				semester: semester,
				curriculum_id: id,
				order_in_semester: orderInSemester
			}

			setUpdatedCourses(prevCourses => [...prevCourses, newCourse])
			// Добавьте новый курс в локальные данные
			const newCourseData = {
				...newCourse,
				course: droppedCourse
			}

			const updatedCourses = [...prevData.courses, newCourseData]
			return {
				...prevData,
				courses: updatedCourses
			}
		})
	}

	const onSave = () => {
		updateCurriculum({ data: updatedCourses, id })
		onEditToggle()
		setIsEditing(false)
	}

	const onShow = () => {
		onEditToggle()
		setIsEditing(true)
	}

	return isLoading ? (
		<div className='flex w-full h-max justify-center'>
			<Loader />
		</div>
	) : (
		<div>
			{localData ? (
				<div className='flex flex-col gap-[30px]'>
					<div className='flex justify-between items-center'>
						<div className='flex flex-col'>
							<div className='flex items-center gap-[5px] mb-[10px]'>
								<span className='font-medium text-[14px] leading-[18px] text-[#2F345C]'>
									Chosen:
								</span>
								<span className='font-bold text-[14px] leading-[18px] text-[#2F345C]'>
									{localData.program_title}, {localData.degree_name}
								</span>
							</div>
							<div className='flex items-center gap-[5px]'>
								<span className='font-medium text-[14px] leading-[18px] text-[#2F345C]'>
									Owner:
								</span>
								<span className='font-bold text-[14px] leading-[18px] text-[#2F345C]'>
									{localData.user.first_name} {localData.user.last_name},{' '}
									{localData.title}
								</span>
							</div>
						</div>
						{isEditing ? (
							<Button
								className='bg-[#1F2150] mb-[10px] text-white rounded-lg'
								onClick={onSave}
							>
								SAVE
							</Button>
						) : (
							<Button
								className='bg-[#1F2150] mb-[10px] text-white rounded-lg'
								onClick={onShow}
							>
								EDIT
							</Button>
						)}
					</div>
					<div className='flex flex-col gap-[30px]'>
						{[...Array(localData.semester_count)].map((_, index) => {
							const semester = index + 1
							console.log(localData)
							const coursesInSemester = localData.courses
								.filter(course => course.semester === semester)
								.map(course => ({
									...course.course,
									order_in_semester: course.order_in_semester
								}))
							return (
								<SemesterCoursesTable
									key={semester}
									semester={semester}
									courses={coursesInSemester}
									onDrop={onDrop}
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
