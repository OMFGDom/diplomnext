'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Modal } from '@/components/ui/modal/Modal'

import { degreeService } from '@/services/degree.service'
import { programService } from '@/services/program.service'

const TemplateSelector = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedDegreeId, setSelectedDegreeId] = useState<string | null>(null)
	const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
		null
	)

	const {
		data: degrees,
		isLoading: isLoadingDegrees,
		isError: isDegreesError
	} = useQuery({
		queryKey: ['degrees'],
		queryFn: () => degreeService.getDegreeList()
	})

	const {
		data: programs,
		isLoading: isLoadingPrograms,
		isError: isProgramsError
	} = useQuery({
		queryKey: ['programs', selectedDegreeId],
		queryFn: () => programService.getProgramsByID(selectedDegreeId!),
		enabled: !!selectedDegreeId
	})

	const handleDegreeSelect = (id: string) => {
		setSelectedDegreeId(id)
		setSelectedProgramId(null) // Сброс выбранной программы
	}

	const handleProgramSelect = (id: string) => {
		setSelectedProgramId(id)
	}

	const handleModalClose = () => {
		setIsModalOpen(false)
		setSelectedDegreeId(null)
		setSelectedProgramId(null)
	}

	const handleOkClick = () => {
		if (selectedProgramId) {
			// Перенаправление на страницу программы
			window.location.href = `/dashboard/curriculum-draft/${selectedProgramId}`
		}
	}

	return (
		<div>
			<Button
				className='w-full bg-[#1F2150] mb-[10px] text-white rounded-lg'
				onClick={() => setIsModalOpen(true)}
			>
				SEE TEMPLATES
			</Button>
			<Modal
				isOpen={isModalOpen}
				onClose={handleModalClose}
			>
				<div>
					<h2 className='text-[25px] text-[#2F345C] text-center mb-[20px]'>
						{selectedDegreeId ? 'Choose Speciality' : 'Choose Degree'}
					</h2>
					{isLoadingDegrees || isLoadingPrograms ? (
						<div className='flex w-full h-max justify-center'>
							<Loader />
						</div>
					) : selectedDegreeId ? (
						programs && programs.length > 0 ? (
							programs.map((program: any) => (
								<div
									className='flex items-center gap-[16px] mb-[16px] last:mb-[40px]'
									key={program.id}
								>
									<input
										type='checkbox'
										checked={selectedProgramId === program.id}
										onChange={() => handleProgramSelect(program.id)}
										className='peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0'
									/>
									<span className='font-medium text-[18px] text-[#1F2150]'>
										{program.title}
									</span>
								</div>
							))
						) : (
							<p className='mb-[40px]'>No programs available.</p>
						)
					) : degrees && degrees.length > 0 ? (
						degrees.map((degree: any) => (
							<div
								className='flex items-center gap-[16px] mb-[16px] last:mb-[40px]'
								key={degree.id}
							>
								<input
									type='checkbox'
									checked={selectedDegreeId === degree.id}
									onChange={() => handleDegreeSelect(degree.id)}
									className='peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0'
								/>
								<span className='font-medium text-[18px] text-[#1F2150]'>
									{degree.name}
								</span>
							</div>
						))
					) : (
						<p className='mb-[40px]'>No degrees available.</p>
					)}
					{isDegreesError && (
						<p className='mb-[40px]'>
							Error loading degrees. Please try again later.
						</p>
					)}
					{isProgramsError && (
						<p className='mb-[40px]'>
							Error loading programs. Please try again later.
						</p>
					)}
					<Button
						className='w-full bg-[#1F2150] text-white rounded-lg'
						onClick={handleOkClick}
					>
						OK
					</Button>
				</div>
			</Modal>
		</div>
	)
}

export default TemplateSelector
