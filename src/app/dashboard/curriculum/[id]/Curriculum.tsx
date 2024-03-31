import { useParams } from 'next/navigation'
import { useState } from 'react'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'

import { useCurriculumById } from '@/hooks/useCurriculumById'
import { useCurriculumUpdate } from '@/hooks/useCurriculumUpdate'

import SemesterCoursesTable from './SemesterCoursesTable'

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
	const [isEditing, setIsEditing] = useState(false)

	const onDrop = (courseId: string, semester: number) => {
		setUpdatedCourses(prevCourses => [
			...prevCourses,
			{
				course_id: courseId,
				semester: semester,
				curriculum_id: id,
				order_in_semester: 1
			}
		])
	}

	const onSave = () => {
		updateCurriculum({ data: updatedCourses, id })
		setIsEditing(false) // Выключить режим редактирования после сохранения
	}

	const onShow = () => {
		onEditToggle()
		setIsEditing(true) // Включить режим редактирования
	}

	return isLoading ? (
		<div className='flex w-full h-max justify-center'>
			<Loader />
		</div>
	) : (
		<div>
			{data ? (
				<div className='flex flex-col gap-[30px]'>
					<div className='flex justify-between items-center'>
						<div className='flex flex-col'>
							<div className='flex items-center gap-[5px] mb-[10px]'>
								<span className='font-medium text-[14px] leading-[18px] text-[#2F345C]'>
									Chosen:
								</span>
								<span className='font-bold text-[14px] leading-[18px] text-[#2F345C]'>
									{data.program_title}, {data.degree_name}
								</span>
							</div>
							<div className='flex items-center gap-[5px]'>
								<span className='font-medium text-[14px] leading-[18px] text-[#2F345C]'>
									Owner:
								</span>
								<span className='font-bold text-[14px] leading-[18px] text-[#2F345C]'>
									{data.user.first_name} {data.user.last_name}, {data.title}
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
						{[...Array(data.semester_count)].map((_, index) => {
							const semester = index + 1
							const coursesInSemester = data.courses
								.filter(course => course.semester === semester)
								.map(course => course.course)
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
