'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Fields'
import { Modal } from '@/components/ui/modal/Modal'

import { curriculumService } from '@/services/curriculum.service'

interface ICurriculumForm {
	title: string
}

const AddCurriculum = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const params = useParams()
	const id = params.id as string

	const { register, handleSubmit, reset } = useForm<ICurriculumForm>({
		mode: 'onChange'
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['curriculum'],
		mutationFn: (data: ICurriculumForm) =>
			curriculumService.createCurriculum({ ...data, program_id: id }),
		onSuccess: () => {
			reset()
			setIsModalOpen(false)
			queryClient.invalidateQueries({ queryKey: ['curriculum by program', id] })
		}
	})

	const onSubmit: SubmitHandler<ICurriculumForm> = data => {
		mutate(data)
	}

	return (
		<div>
			<Button
				className='w-full bg-[#1F2150] mb-[10px] text-white rounded-lg'
				onClick={() => setIsModalOpen(true)}
			>
				CREATE
			</Button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='font-semibold text-[25px] text-[#2F345C] text-center mb-[30px]'>
						Enter name folder
					</div>
					<Field
						id='title'
						label='Title'
						placeholder='Enter title '
						type='text'
						{...register('title', { required: 'Title is required!' })}
						extra='mb-6'
					/>
					<Button
						className='w-full bg-[#1F2150] text-white rounded-lg'
						type='submit'
					>
						Create Curriculum
					</Button>
				</form>
			</Modal>
		</div>
	)
}

export default AddCurriculum
