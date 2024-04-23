'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Accordion from '@/components/ui/accordeon/Accordeon'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Fields'

import { ICourseAdd } from '@/types/course.types'

import CourseSelect from './CourseSelect'
import { coursesService } from '@/services/course.service'

const CourseForm = () => {
	const { register, handleSubmit, reset } = useForm<ICourseAdd>()
	const queryClient = useQueryClient()
	const [selectedSubIds, setSelectedSubIds] = useState<string[]>([])
	const [selectedPreIds, setSelectedPreIds] = useState<string[]>([])

	const { mutate } = useMutation({
		mutationKey: ['addCourse'],
		mutationFn: (course: ICourseAdd) => coursesService.addCourse(course),
		onSuccess: () => {
			reset()
			setSelectedSubIds([])
			setSelectedPreIds([])
			queryClient.invalidateQueries({ queryKey: ['courses'] })
			toast.success('Successfully added course!')
		}
	})

	const onSubmit: SubmitHandler<ICourseAdd> = data => {
		const courseData = {
			...data,
			sub_ids: selectedSubIds,
			pre_ids: selectedPreIds
		}
		mutate(courseData)
	}

	return (
		<div className='p-4'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4 w-full'
			>
				<Field
					{...register('title')}
					label='Title'
					id='title'
					placeholder='Enter the title'
					extra='mb-6 max-w-[280px] w-[280px]'
				/>
				<Field
					{...register('title_kz')}
					label='Title KZ'
					id='title_kz'
					placeholder='Enter the title in Kazakh'
					extra='mb-6 max-w-[280px] w-[280px]'
				/>
				<Field
					{...register('title_ru')}
					label='Title RU'
					id='title_ru'
					placeholder='Enter the title in Russian'
					extra='mb-6 max-w-[280px] w-[280px]'
				/>
				<Field
					{...register('course_code')}
					label='Course Code'
					id='course_code'
					placeholder='Enter the course code'
					extra='mb-6 max-w-[280px] w-[280px]'
				/>
				<Field
					{...register('teor')}
					label='Theoretical Hours'
					type='number'
					id='teor'
					placeholder='Enter theoretical hours'
					extra='mb-6 max-w-[280px] w-[280px]'
				/>
				<Field
					{...register('pr')}
					id='pr'
					label='Practical Hours'
					placeholder='Enter practical hours'
					extra='mb-6 max-w-[280px] w-[280px]'
				/>
				<Field
					id='cr'
					{...register('cr')}
					label='Credit Hours'
					type='number'
					placeholder='Enter credit hours'
					extra='mb-6 max-w-[280px] w-[280px]'
				/>
				<Field
					id='ects'
					{...register('ects')}
					label='ECTS'
					type='number'
					placeholder='Enter ECTS'
					extra='mb-6 max-w-[280px] w-[280px]'
				/>
				<Field
					{...register('term')}
					label='Term'
					id='term'
					placeholder='Enter term'
					extra='mb-6 max-w-[280px] w-[280px]'
				/>
				<Accordion title='Add SubCourses(OPTIONAL)'>
					<CourseSelect
						selectedCourses={selectedSubIds}
						setSelectedCourses={setSelectedSubIds}
					/>
				</Accordion>
				<Accordion title='Add PreCourses(OPTIONAL)'>
					<CourseSelect
						selectedCourses={selectedPreIds}
						setSelectedCourses={setSelectedPreIds}
					/>
				</Accordion>
				<Button
					type='submit'
					className='w-full bg-[#1F2150] text-white rounded-lg'
				>
					Add Course
				</Button>
			</form>
		</div>
	)
}

export default CourseForm
