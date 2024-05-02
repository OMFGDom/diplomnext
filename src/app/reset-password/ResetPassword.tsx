'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Fields'

import { IResetPassword } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

export function ResetPassword() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token') as string
	const router = useRouter()
	const { push } = router

	const { register, handleSubmit, reset, watch } = useForm<IResetPassword>({
		mode: 'onChange'
	})

	const pushToLogin = () => {
		push('/auth')
	}

	// Query to validate the token before showing the form
	const { isLoading, isError, error } = useQuery({
		queryKey: ['resetValidate', token],
		queryFn: async () => {
			const response = await authService.resetValidate(token)
			if (response.status !== 200) {
				throw new Error('Invalid token!')
			}
			return response
		}
	})

	if (error) {
		toast.error(error.message || 'Invalid token!')
		pushToLogin()
	}

	const { mutate: resetPasswordMutate } = useMutation({
		mutationKey: ['resetPassword'],
		mutationFn: (data: IResetPassword) =>
			authService.resetPassword(data, token),
		onSuccess: () => {
			toast.success('Password reset successfully!')
			reset()
			setTimeout(() => router.push('/auth'), 2000)
		},
		onError: error => {
			toast.error('Error resetting password!')
		}
	})

	const onSubmit: SubmitHandler<IResetPassword> = data => {
		if (data.new_password !== watch('repeat_new_password')) {
			toast.error('Passwords do not match!')
			return
		}
		resetPasswordMutate(data)
	}

	if (isLoading) {
		return (
			<div className='flex justify-center m-auto min-h-screen'>
				<Loader />
			</div>
		)
	}

	if (isError) {
		toast.error(error.message || 'Invalid token!')
		pushToLogin()
		return null
	}

	return (
		<div className='flex min-h-screen'>
			<form
				className='z-30 w-[480px] m-auto shadow bg-white rounded-[50px] p-[30px]'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className='text-center mb-4 text-[25px] font-semibold'>
					Reset Password
				</h2>

				<Field
					id='new_password'
					label='New Password:'
					placeholder='Enter new password:'
					type='password'
					{...register('new_password', {
						required: 'New password is required!'
					})}
					extra='mb-4'
				/>

				<Field
					id='repeat_new_password'
					label='Repeat New Password:'
					placeholder='Repeat new password:'
					type='password'
					{...register('repeat_new_password', {
						required: 'Repeat password is required!'
					})}
					extra='mb-6'
				/>

				<div className='flex flex-col items-center justify-center'>
					<Button
						className='w-full bg-[#1F2150] mb-[10px] text-white rounded-lg'
						type='submit'
					>
						Reset Password
					</Button>
					<span
						onClick={() => pushToLogin()}
						className='mt-[10px] cursor-pointer underline text-[#2F345C]'
					>
						Return to login
					</span>
				</div>
			</form>
		</div>
	)
}
