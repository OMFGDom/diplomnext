'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import Loader from '@/components/ui/Loader'

import { useCurriculumByProgram } from '@/hooks/useCurriculumByProgram'

import calendar from '../../../../../public/calendar.svg'

import AddCurriculum from './AddCurriculum'

export function CurriculumDraft() {
	const params = useParams()
	const id = params.id as string
	const { data, isLoading } = useCurriculumByProgram(id)

	return isLoading ? (
		<div className='flex w-full h-max justify-center'>
			<Loader />
		</div>
	) : (
		<>
			<div className='flex items-center justify-between w-full mb-[35px]'>
				{data ? (
					<div className='flex items-center'>
						<div className='fonte-medium color-[#2F345C] mr-[5px]'>Chosen:</div>
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
						<Link
							key={item.id}
							href={`/dashboard/curriculum/${item.id}`}
							passHref
						>
							<div className='p-[12px] border-solid border-[#1F2150] border-[1px] rounded-[16px] h-full transition-all duration-300 hover:bg-[#f0f2f5] hover:scale-105'>
								<h3 className='text-[#2F345C] font-medium mb-[40px]'>
									{item.title}
								</h3>
								<div className='flex items-center gap-[10px] pb-[8px] border-b-[1px] border-b-[#D9D9D9] border-b-solid mb-[8px]'>
									<Image
										src={calendar}
										alt='calendar'
										width={15}
										height={15}
									/>
									<span className='text-[#2F345C] font-medium'>
										{item.year}
									</span>
								</div>
								<p className='text-[#2F345C] font-medium'>
									{item.user.first_name || item.user.last_name
										? `${item.user.first_name} ${item.user.last_name}`
										: 'No user'}
								</p>
							</div>
						</Link>
					))}
				</div>
			) : (
				<div>Curriculum not loaded!</div>
			)}
		</>
	)
}
