'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Fields'

import { IUpdateUser } from '@/types/auth.types'
import { IFacultyList } from '@/types/faculty.types'

import { facultyService } from '@/services/faculty.service'
import { userService } from '@/services/user.service'

const EditForm = () => {
	const params = useParams()
	const id = params.id as string
	const [faculties, setFaculties] = useState<IFacultyList>([])
	const { register, handleSubmit, reset, setValue } = useForm<IUpdateUser>({
		defaultValues: {
			faculty_id: faculties[0]?.id ?? ''
		}
	})
	const [fileName, setFileName] = useState<string>('')
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [profileImage, setProfileImage] = useState<string>('')
	const [isSuperuser, setIsSuperuser] = useState<boolean>(false)
	const queryClient = useQueryClient()
	const router = useRouter()

	// Fetch faculties and user data
	useQuery({
		queryKey: ['faculties'],
		queryFn: async () => {
			const facultyList = await facultyService.getAllFaculties()
			setFaculties(facultyList)
			return facultyList
		}
	})

	useQuery({
		queryKey: ['user', id],
		queryFn: async () => {
			const user = await userService.getUserById(id)
			setValue('first_name', user.first_name)
			setValue('last_name', user.last_name)
			setValue('email', user.email)
			setValue('faculty_id', user.faculty_id)
			setIsSuperuser(user.is_superuser === true)
			setProfileImage(user.profile_image)
			return user
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['updateUser'],
		mutationFn: async (userData: IUpdateUser) => {
			const formData = new FormData()

			formData.append(
				'form_data',
				JSON.stringify({
					email: userData.email,
					first_name: userData.first_name,
					last_name: userData.last_name,
					password: userData.password,
					old_password: userData.old_password, // Include old password
					is_active: userData.is_active ?? true,
					is_superuser: isSuperuser,
					faculty_id: userData.faculty_id
				})
			)

			if (selectedFile) {
				formData.append('profile_image', selectedFile)
			}

			return userService.updateUser(id, formData)
		},
		onSuccess: () => {
			reset()
			queryClient.invalidateQueries({ queryKey: ['users'] })
			toast.success('Successfully updated user!')
			router.push('../users')
		},
		onError: error => {
			let errorMessage = `Error updating user: ${error}`

			// Check if error has a response and cast it
			if (typeof error === 'object' && error !== null && 'response' in error) {
				const responseError = error.response as { data: { detail?: string } }

				if (responseError.data?.detail === 'Invalid old password') {
					errorMessage = 'Invalid old password.'
				}
			}

			toast.error(errorMessage)
		}
	})

	const onSubmit: SubmitHandler<IUpdateUser> = data => {
		if (data.password && !data.old_password) {
			toast.error(
				'Cannot send a new password without providing the old password.'
			)
			return
		}

		if (data.old_password && !data.password) {
			toast.error(
				'Cannot send the old password without providing a new password.'
			)
			return
		}

		mutate(data)
	}

	return (
		<div className='p-4 w-3/5'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4 w/full'
			>
				<div className='space-y-4'>
					<Field
						{...register('first_name')}
						label='First Name'
						id='first_name'
						placeholder='Enter the first name'
						extra='mb-6 max-w-full w/full'
					/>
					<Field
						{...register('last_name')}
						label='Last Name'
						id='last_name'
						placeholder='Enter the last name'
						extra='mb-6 max-w-full w/full'
					/>
					<Field
						{...register('email')}
						label='Email'
						id='email'
						placeholder='Enter the email'
						extra='mb-6 max-w-full w/full'
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
						className='border rounded-lg p-2 w/full'
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
							checked={isSuperuser === true} // Directly check based on state
							onChange={() => setIsSuperuser(true)}
							id='is_superuser_true'
						/>
						<label
							htmlFor='is_superuser_true'
							className='ml-2'
						>
							Yes
						</label>

						<input
							type='radio'
							checked={isSuperuser === false} // Directly check based on state
							onChange={() => setIsSuperuser(false)}
							id='is_superuser_false'
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
						Current Profile Image
					</label>
					{profileImage && (
						<div className='flex items-center mb-4'>
							<Image
								src={profileImage}
								alt='Current profile image'
								width={64}
								height={64}
							/>
						</div>
					)}
					<div className='flex items-center'>
						<input
							type='file'
							{...register('profile_image')}
							id='profile_image'
							accept='image/*'
							className='hidden'
							onChange={e => {
								const file = e.target.files?.[0]
								setFileName(file?.name ?? '')
								setSelectedFile(file || null)
							}}
						/>

						<label
							htmlFor='profile_image'
							className='bg-[#1F2150] text-white p-2 rounded cursor-pointer'
						>
							Change Photo
						</label>

						{fileName && <span className='ml-2'>{fileName}</span>}
					</div>
					<Field
						{...register('old_password')}
						label='Old Password'
						id='old_password'
						type='password'
						placeholder='Enter old password if changing'
						extra='mb-6 max-w-full w/full'
					/>
					<Field
						{...register('password')}
						label='New Password'
						id='password'
						type='password'
						placeholder='Enter a new password'
						extra='mb-6 max-w-full w/full'
					/>
				</div>

				<Button
					type='submit'
					className='w/full bg-[#1F2150] text-white rounded-lg'
				>
					Update User
				</Button>
			</form>
		</div>
	)
}

export default EditForm
