'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BadgeCheck, Download, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'

import { useCurriculumByProgram } from '@/hooks/useCurriculumByProgram'

import calendar from '../../../../../public/calendar.svg'
import dots from '../../../../../public/dots.svg'

import AddCurriculum from './AddCurriculum'
import { curriculumService } from '@/services/curriculum.service'

interface DropdownOpenState {
	[key: string]: boolean
}

export function CurriculumDraft() {
	const params = useParams()
	const id = params.id as string
	const { data, isLoading } = useCurriculumByProgram(id)
	const queryClient = useQueryClient()

	// Использование объекта для управления состоянием каждого dropdown
	const [dropdownsOpen, setDropdownsOpen] = useState<{
		[key: string]: boolean
	}>({})

	// Ссылки для каждого dropdown
	const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

	const toggleDropdown = (itemId: string) => {
		setDropdownsOpen(prevState => ({
			...prevState,
			[itemId]: !prevState[itemId]
		}))
	}

	const closeDropdowns = (event: MouseEvent) => {
		const target = event.target as Node
		let shouldCloseDropdowns = true

		Object.entries(dropdownRefs.current).forEach(([key, ref]) => {
			if (ref && ref.contains(target)) {
				shouldCloseDropdowns = false
			}
		})

		if (shouldCloseDropdowns) {
			setDropdownsOpen({})
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', closeDropdowns)
		return () => {
			document.removeEventListener('mousedown', closeDropdowns)
		}
	}, [])

	const { mutate: downloadCurriculum } = useMutation({
		mutationFn: (curriculumId: string) =>
			curriculumService.getExcelCurriculum(curriculumId),
		onSuccess: data => {
			// Создание URL для скачивания
			const url = window.URL.createObjectURL(new Blob([data]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', 'curriculum.xlsx') // Или любое другое название файла
			document.body.appendChild(link)
			link.click()

			// Безопасное удаление ссылки из DOM
			if (link.parentNode) {
				link.parentNode.removeChild(link)
			}

			toast.success('Curriculum downloaded!')
		},
		onError: error => {
			// Обработка ошибок
			toast.error('Failed to download curriculum.')
		}
	})

	const { mutate: deleteCurriculum } = useMutation({
		mutationFn: (curriculumId: string) =>
			curriculumService.deleteCurriculum(curriculumId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['curriculum by program', id] })
			toast.success('Curriculum deleted!')
		}
	})

	const { mutate: setMainCurriculum } = useMutation({
		mutationFn: (curriculumId: string) =>
			curriculumService.setCurriculumAsMain(curriculumId),
		onSuccess: () => {
			toast.success('Curriculum set as main!')
		}
	})
	return isLoading ? (
		<div className='flex w-full h-max justify-center'>
			<Loader />
		</div>
	) : (
		<>
			<div className='flex items-center justify-between w-full mb-[35px]'>
				{data ? (
					<div className='flex items-center'>
						<div className='font-medium color-[#2F345C] mr-[5px]'>Chosen:</div>
						<h2 className='font-bold color-[#2F345C]'>
							{data.program.program_title}, {data.program.degree_name}
						</h2>
					</div>
				) : (
					<div>Curriculum not loaded!</div>
				)}
				<AddCurriculum />
			</div>
			{data ? (
				<div className='grid grid-cols-6 gap-[25px] w-full'>
					{data.curriculums.map(item => (
						<div
							key={item.id}
							className='p-[12px] border-solid border-[#1F2150] border-[1px] rounded-[16px] h-full transition-all duration-300 hover:bg-[#f0f2f5] hover:scale-105'
							ref={el => (dropdownRefs.current[item.id] = el)}
						>
							<div className='flex flex-row justify-between mb-[40px]'>
								<Link
									href={`/dashboard/curriculum/${item.id}`}
									passHref
								>
									<h3 className='text-[#2F345C] font-medium'>{item.title}</h3>
								</Link>
								<div
									onClick={() => toggleDropdown(item.id)}
									className='w-[21px] h-[21px] pt-[2px] relative cursor-pointer'
								>
									<Image
										src={dots}
										alt='dots'
										width={21}
										height={21}
									/>
									{dropdownsOpen[item.id] && (
										<div className='absolute right-0 w-40 bg-white shadow-md mt-2 py-2 rounded-md'>
											<button
												onClick={() => downloadCurriculum(item.id)}
												className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
											>
												<Download size={12} />
												<span className='block ml-[10px]'>Download</span>
											</button>
											<button
												onClick={() => deleteCurriculum(item.id)}
												className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
											>
												<Trash2 size={12} />
												<span className='block ml-[10px]'>Delete</span>
											</button>
											<button
												onClick={() => setMainCurriculum(item.id)}
												className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
											>
												<BadgeCheck size={12} />
												<span className='block ml-[10px]'>Set as main</span>
											</button>
										</div>
									)}
								</div>
							</div>
							<div className='flex items-center gap-[10px] pb-[8px] border-b-[1px] border-b-[#D9D9D9] border-b-solid mb-[8px]'>
								<Image
									src={calendar}
									alt='calendar'
									width={15}
									height={15}
								/>
								<span className='text-[#2F345C] font-medium'>{item.year}</span>
							</div>
							<p className='text-[#2F345C] font-medium'>
								{item.user.first_name || item.user.last_name
									? `${item.user.first_name} ${item.user.last_name}`
									: 'No user'}
							</p>
						</div>
					))}
				</div>
			) : (
				<div>Curriculum not loaded!</div>
			)}
		</>
	)
}
