'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/buttons/Button'
import { Modal } from '@/components/ui/modal/Modal'

import {
	AllCourseBulkCreateResponse,
	ICourseBulkCreate
} from '@/types/course.types'

import deleteIcon from '../../../../public/delete.svg'

import { coursesService } from '@/services/course.service'

export default function UploadExcel() {
	const [isModalOpen, setModalOpen] = useState(false)
	const [file, setFile] = useState<File | null>(null)
	const [uploadedCourses, setUploadedCourses] =
		useState<AllCourseBulkCreateResponse>([])
	const [isUploaded, setIsUploaded] = useState(false)
	const [isCreated, setIsCreated] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { reset } = useForm()
	const queryClient = useQueryClient()

	const uploadMutation = useMutation({
		mutationKey: ['uploadExcel'],
		mutationFn: async (file: File) => {
			const formData = new FormData()
			formData.append('excel_file', file)

			return coursesService.uploadExcel(formData)
		},
		onSuccess: data => {
			setUploadedCourses(data)
			setIsUploaded(true)
			setError(null)
		},
		onError: (error: any) => {
			setError(error.message)
			setIsUploaded(false)
		}
	})

	const createMutation = useMutation({
		mutationKey: ['bulkCreateCourse'],
		mutationFn: async (courses: AllCourseBulkCreateResponse) => {
			return coursesService.bulkCreateCourse(courses)
		},
		onSuccess: () => {
			setIsCreated(true)
			setError(null)
			queryClient.invalidateQueries({ queryKey: ['all courses'] })
		},
		onError: (error: any) => {
			setError(error.message)
			setIsCreated(false)
		}
	})

	const openModal = () => setModalOpen(true)
	const closeModal = () => {
		setModalOpen(false)
		setFile(null)
		reset()
		setUploadedCourses([])
		setIsUploaded(false)
		setIsCreated(false)
		setError(null)
	}

	const onFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			setFile(event.dataTransfer.files[0])
		}
	}

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0])
		}
	}

	const sendFile = () => {
		if (file) {
			uploadMutation.mutate(file)
		} else {
			toast.error('No file selected')
		}
	}

	const onRemoveFile = () => {
		setFile(null)
		toast.info('File removed.')
	}

	const handleContinue = () => {
		createMutation.mutate(uploadedCourses)
	}

	const renderModalContent = () => {
		if (isCreated) {
			return (
				<>
					<h2 className='text-[25px] text-[#2F345C] font-semibold mb-6 text-center'>
						Courses successfully added!
					</h2>
					<Button
						onClick={closeModal}
						className='w-full bg-[#1F2150] text-white rounded-lg'
					>
						OK
					</Button>
				</>
			)
		}

		if (error) {
			return (
				<>
					<h2 className='text-[25px] text-[#2F345C] font-semibold mb-6 text-center'>
						Something went wrong
					</h2>
					<p>{error}</p>
					<Button
						onClick={closeModal}
						className='w-full bg-[#1F2150] text-white rounded-lg'
					>
						OK
					</Button>
				</>
			)
		}

		if (isUploaded) {
			return (
				<>
					<h2 className='text-[25px] text-[#2F345C] font-semibold mb-6 text-center'>
						These courses will be added.
					</h2>
					<table className='text-center mb-6 '>
						<thead>
							<tr>
								<th>Course Code</th>
								<th>Title</th>
								<th>Teor</th>
								<th>Pr</th>
								<th>Cr</th>
								<th>ECTS</th>
								<th>Term</th>
							</tr>
						</thead>
						<tbody>
							{uploadedCourses.map((course: ICourseBulkCreate, index) => (
								<tr key={index}>
									<td className='border border-gray-300 p-2'>
										{course.course_code}
									</td>
									<td className='border border-gray-300 p-2'>{course.title}</td>
									<td className='border border-gray-300 p-2'>{course.teor}</td>
									<td className='border border-gray-300 p-2'>{course.pr}</td>
									<td className='border border-gray-300 p-2'>{course.cr}</td>
									<td className='border border-gray-300 p-2'>{course.ects}</td>
									<td className='border border-gray-300 p-2'>{course.term}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className='flex items-center gap-5 '>
						<Button
							onClick={closeModal}
							className='w-full bg-white text-[#000] rounded-lg'
						>
							Back
						</Button>
						<Button
							onClick={handleContinue}
							className='w-full bg-[#1F2150] text-white rounded-lg'
						>
							Continue
						</Button>
					</div>
				</>
			)
		}

		return (
			<>
				<div className='w-full p-4'>
					<div
						className='w-full h-[200px] border-dashed border-2 border-gray-300 flex justify-center items-center cursor-pointer'
						onClick={() => document.getElementById('fileInput')?.click()}
						onDrop={onFileDrop}
						onDragOver={event => event.preventDefault()}
					>
						{file ? (
							<>
								<p>{file.name}</p>
								<Image
									src={deleteIcon}
									alt='delete'
									onClick={onRemoveFile}
								/>
							</>
						) : (
							<p>Drag and drop an Excel file here, or click to select file</p>
						)}
					</div>
					<input
						id='fileInput'
						type='file'
						accept='.xlsx, .xls'
						style={{ display: 'none' }}
						onChange={onFileChange}
					/>
					<Button
						className='w-full bg-[#1F2150] text-white rounded-lg mt-4'
						onClick={sendFile}
					>
						Send Excel
					</Button>
				</div>
			</>
		)
	}

	return (
		<>
			<Button
				className='w-full bg-[#1F2150] text-white rounded-lg'
				onClick={openModal}
			>
				Upload Excel
			</Button>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
			>
				{renderModalContent()}
			</Modal>
		</>
	)
}
