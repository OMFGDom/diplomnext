'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Accordion from '@/components/ui/accordeon/Accordeon'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Fields'

import { ICourseAdd } from '@/types/course.types'

import CourseSelect from './CourseSelect'
import { coursesService } from '@/services/course.service'

const EditCourse = () => {
	const params = useParams()
	const id = params.id as string

	const [selectedSubIds, setSelectedSubIds] = useState<string[]>([])
	const [selectedPreIds, setSelectedPreIds] = useState<string[]>([])

	const { register, handleSubmit, setValue, reset } = useForm<ICourseAdd>({
		defaultValues: {
			sub_ids: [],
			pre_ids: []
		}
	})

	const queryClient = useQueryClient()
	const router = useRouter()

	useQuery({
		queryKey: ['course', id],
		queryFn: async () => {
			const course = await coursesService.getCourseById(id)
			const { prerequisites, subcourses, ...rest } = course

			for (const [key, value] of Object.entries(rest)) {
				setValue(key as keyof ICourseAdd, value as never)
			}

			setSelectedPreIds(prerequisites.map(pre => pre.id || ''))
			setSelectedSubIds(subcourses.map(sub => sub.id || ''))

			return course
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['updateCourse'],
		mutationFn: async (course: ICourseAdd) => {
			return coursesService.updateCourse(course, id)
		},
		onSuccess: () => {
			reset()
			setSelectedSubIds([])
			setSelectedPreIds([])
			queryClient.invalidateQueries({ queryKey: ['courses'] })
			toast.success('Successfully updated course!')
			router.push('../all-courses')
		},
		onError: error => {
			toast.error(`Error updating course: ${error}`)
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
		<div className='p-4 w-3/5'>
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
					{...register('cr')}
					id='cr'
					label='Credit Hours'
					type='number'
					placeholder='Enter credit hours'
					extra='mb-6 max-w-[280px] w/[280px]'
				/>
				<Field
					{...register('ects')}
					id='ects'
					label='ECTS'
					type='number'
					placeholder='Enter ECTS'
					extra='mb-6 max-w-[280px] w/[280px]'
				/>
				<Field
					{...register('term')}
					label='Term'
					id='term'
					placeholder='Enter term'
					extra='mb-6 max-w-[280px] w/[280px]'
				/>

				<Accordion title='Add SubCourses (OPTIONAL)'>
					<CourseSelect
						selectedCourses={selectedSubIds}
						setSelectedCourses={setSelectedSubIds}
					/>
				</Accordion>

				<Accordion title='Add PreCourses (OPTIONAL)'>
					<CourseSelect
						selectedCourses={selectedPreIds}
						setSelectedCourses={setSelectedPreIds}
					/>
				</Accordion>

				<Button
					type='submit'
					className='w/full bg-[#1F2150] text-white rounded-lg'
				>
					Update Course
				</Button>
			</form>
		</div>
	)
}

export default EditCourse
