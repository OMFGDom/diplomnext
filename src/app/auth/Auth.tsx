'use client';

import { IAuthForm } from '@/types/auth.types'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { Button } from '@/components/ui/buttons/Button';
import { Field } from '@/components/ui/fields/Fields';

import Image from 'next/image';
import logo from '../../../public/logo.svg';
import authlogo from '../../../public/auth.svg';


export function Auth() {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onChange'
  });

  const [isLoginForm, setIsLoginForm] = useState(false);

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'create_user', data),
    onSuccess: () => {
      toast.success('Вы успешно вошли в систему');
      reset();
      push(DASHBOARD_PAGES.HOME);
    },
    onError: (error) => {
      toast.error('Ошибка входа в систему: неправильный логин или пароль!');
    }
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  }

  return (
    <div className='flex min-h-screen'>
      <div className="w-[86px] h-[59px] top-[27px] left-[20px] absolute">
        <Image src={logo} alt="logo" />
      </div>
      <form
        className='z-30 w-[480px] m-auto shadow bg-white rounded-[50px] p-[30px]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-center mb-4 text-[25px] font-semibold">
          Sign in
        </h2>

        <Field
          id='email'
          label='Email:'
          placeholder='Enter username:'
          type='text'
          extra='mb-4'
          {...register('email', {
            required: 'Email is required!'
          })}
        />

        <Field
          id='password'
          label='Password: '
          placeholder='Enter password: '
          type='password'
          {...register('password', {
            required: 'Password is required!'
          })}
          extra='mb-6'
        />

        <div className='flex flex-col items-center justify-center'>
          <Button className="w-full bg-[#1F2150] mb-[10px] text-white rounded-lg" onClick={() => setIsLoginForm(true)}>Login</Button>
          <span>
            Forgot my password?
          </span>
        </div>
      </form>
      <div className='fixed bottom-0 left-0 w-full bg-[#1f2150]'>
        <span className="flex text-left text-white py-[10px] ml-[85px] text-[20px] lineHeight-[24px]">
          2024 © SDU UNIVERSITY
        </span>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[650px] h-[176px]">
          <Image src={authlogo} alt="auth-logo" />
        </div>
      </div>
    </div >
  )
}