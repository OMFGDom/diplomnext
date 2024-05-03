'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/buttons/Button'

import Example from '../../../../public/example.jpg'
import { Modal } from '../../../components/ui/modal/Modal'

const SeeExample = () => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	const handleDownload = () => {
		const link = document.createElement('a')
		link.href = '/example.xlsx' // Путь относительно публичной папки
		link.download = 'example.xlsx'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<>
			<Button
				className='w-full bg-[#1F2150] text-white rounded-lg'
				onClick={openModal}
			>
				SEE EXAMPLE
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={closeModal}
			>
				<div className='flex flex-col items-center space-y-4'>
					<Image
						src={Example}
						alt='Example'
						width={1280}
						height={330}
					/>
					<div className='flex items-center gap-4 w-full'>
						<Button
							className='w-full bg-[#1F2150] text-white rounded-lg'
							onClick={handleDownload}
						>
							Download
						</Button>
						<Button
							className='w-full bg-[#1F2150] text-white rounded-lg'
							onClick={closeModal}
						>
							Ok
						</Button>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default SeeExample
