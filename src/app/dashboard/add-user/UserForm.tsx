'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Fields'

import { ICreateUser } from '@/types/auth.types'
import { IFacultyList } from '@/types/faculty.types'

import { facultyService } from '@/services/faculty.service'
import { userService } from '@/services/user.service'

const UserForm = () => {
	const { register, handleSubmit, reset } = useForm<ICreateUser>()
	const [faculties, setFaculties] = useState<IFacultyList>([])
	const [fileName, setFileName] = useState<string>('')
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const queryClient = useQueryClient()
	const router = useRouter()

	// Fetch faculties for the select input
	useQuery({
		queryKey: ['faculties'],
		queryFn: async () => {
			const facultyList = await facultyService.getAllFaculties()
			setFaculties(facultyList)
			return facultyList
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['createUser'],
		mutationFn: async (userData: ICreateUser) => {
			// Prepare form data
			const formData = new FormData()

			formData.append(
				'form_data',
				JSON.stringify({
					email: userData.email,
					first_name: userData.first_name,
					last_name: userData.last_name,
					password: userData.password,
					is_active: userData.is_active ?? true,
					is_superuser: userData.is_superuser ?? false,
					faculty_id: userData.faculty_id
				})
			)

			if (selectedFile) {
				formData.append('profile_image', selectedFile)
			}

			// Send form data
			return userService.createUser(formData)
		},
		onSuccess: () => {
			reset()
			queryClient.invalidateQueries({ queryKey: ['users'] })
			toast.success('Successfully created user!')
			router.push('dashboard/users')
		},
		onError: error => {
			toast.error(`Error creating user: ${error}`)
		}
	})

	const onSubmit: SubmitHandler<ICreateUser> = data => {
		mutate(data)
	}

	return (
		<div className='p-4'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4 w-full'
			>
				<div className='space-y-4'>
					<Field
						{...register('first_name')}
						label='First Name'
						id='first_name'
						placeholder='Enter the first name'
						extra='mb-6 max-w-[280px] w-[280px]'
					/>
					<Field
						{...register('last_name')}
						label='Last Name'
						id='last_name'
						placeholder='Enter the last name'
						extra='mb-6 max-w-[280px] w-[280px]'
					/>
					<Field
						{...register('email')}
						label='Email'
						id='email'
						placeholder='Enter the email'
						extra='mb-6 max-w-[280px] w-[280px]'
					/>

					<label
						htmlFor='password'
						className='block text-sm font-medium'
					>
						Password
					</label>
					<input
						{...register('password')}
						id='password'
						type='password'
						placeholder='Enter password'
						className='border rounded-lg p-2 w-full'
					/>

					<label
						htmlFor='faculty_id'
						className='block text-sm font-medium'
					>
						Faculty
					</label>
					<select
						{...register('faculty_id')}
						id='faculty_id'
						className='border rounded-lg p-2 w-full'
					>
						{faculties.map(faculty => (
							<option
								key={faculty.id}
								value={faculty.id}
							>
								{faculty.title}
							</option>
						))}
					</select>

					<label
						htmlFor='is_superuser'
						className='block text-sm font-medium'
					>
						Is Superuser
					</label>
					<div className='flex items-center'>
						<input
							type='radio'
							{...register('is_superuser')}
							id='is_superuser_true'
							value='true'
						/>
						<label
							htmlFor='is_superuser_true'
							className='ml-2'
						>
							Yes
						</label>

						<input
							type='radio'
							{...register('is_superuser')}
							id='is_superuser_false'
							value='false'
							className='ml-4'
						/>
						<label
							htmlFor='is_superuser_false'
							className='ml-2'
						>
							No
						</label>
					</div>

					<label
						htmlFor='profile_image'
						className='block text-sm font-medium'
					>
						Profile Image
					</label>
					<div className='flex items-center'>
						<input
							type='file'
							{...register('profile_image')}
							id='profile_image'
							accept='image/*'
							className='hidden'
							onChange={e => {
								const fileName = e.target.files?.[0]?.name
								setFileName(fileName ?? '')
							}}
						/>

						<label
							htmlFor='profile_image'
							className='bg-[#1F2150] text-white p-2 rounded cursor-pointer '
						>
							Выбрать фото
						</label>

						{fileName && <span className='ml-2'>{fileName}</span>}
					</div>
				</div>

				<Button
					type='submit'
					className='w-full bg-[#1F2150] text-white rounded-lg'
				>
					Create User
				</Button>
			</form>
		</div>
	)
}

export default UserForm
