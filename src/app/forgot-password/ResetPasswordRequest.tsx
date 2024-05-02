'use client'

import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Fields'

import authlogo from '../../../public/auth.svg'
import logo from '../../../public/logo.svg'

import { authService } from '@/services/auth.service'

export function ResetPasswordRequest() {
	const { register, handleSubmit, reset } = useForm<{ email: string }>({
		mode: 'onChange'
	})

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['resetPasswordRequest'],
		mutationFn: (data: { email: string }) =>
			authService.resetPasswordRequest(data.email),
		onSuccess: () => {
			toast.success('Password reset link sent to your email')
			reset()
		},
		onError: () => {
			toast.error('Error sending reset link. Please check your email.')
		}
	})

	const pushToLogin = () => {
		push('/auth')
	}

	const onSubmit: SubmitHandler<{ email: string }> = data => {
		mutate(data)
	}

	return (
		<div className='flex min-h-screen'>
			<div className='w-[86px] h-[59px] absolute top-[27px] left-[20px]'>
				<Image
					src={logo}
					alt='logo'
				/>
			</div>
			<form
				className='z-30 w-[480px] m-auto shadow bg-white rounded-[50px] p-[30px]'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className='text-center mb-4 text-[25px] font-semibold'>
					Forgot your password?
				</h2>
				<p>
					Please enter the email address associated with your account. A{' '}
					<b>reset link</b> will be sent to you.
				</p>
				<Field
					id='email'
					label='Email:'
					placeholder='Enter your email'
					type='email'
					{...register('email', { required: 'Email is required!' })}
					extra='mb-4'
				/>

				<div className='flex flex-col items-center justify-center'>
					<Button className='w-full bg-[#1F2150] text-white rounded-lg'>
						Send Reset Link
					</Button>
					<span
						onClick={() => pushToLogin()}
						className='mt-[10px] cursor-pointer underline text-[#2F345C]'
					>
						Return to login
					</span>
				</div>
			</form>

			<div className='fixed bottom-0 left-0 w-full bg-[#1f2150]'>
				<span className='flex text-left text-white py-[10px] ml-[85px] text-[20px] lineHeight-[24px]'>
					2024 © SDU UNIVERSITY
				</span>
				<div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[650px] h-[176px]'>
					<Image
						src={authlogo}
						alt='auth-logo'
					/>
				</div>
			</div>
		</div>
	)
}
