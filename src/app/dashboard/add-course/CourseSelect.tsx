'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { Field } from '@/components/ui/fields/Fields'

import { useAllCourses } from '@/hooks/useAllCourses'

interface ICourse {
	title: string
	course_code: string
	teor: string
	pr: string
	cr: string
	ects: string
	term: string | null
	user_id: string
	id: string
}

const ItemTypes = {
	COURSE: 'course'
}

const CourseItem: React.FC<{
	course: ICourse
	onRemove: (id: string) => void
	moveCourse: (dragId: string, hoverId: string) => void
}> = ({ course, onRemove, moveCourse }) => {
	const ref = useRef<HTMLLIElement>(null)
	const [, drag] = useDrag(() => ({
		type: ItemTypes.COURSE,
		item: { id: course.id }
	}))

	const [, drop] = useDrop(() => ({
		accept: ItemTypes.COURSE,
		hover(item: { id: string }) {
			if (item.id !== course.id) {
				moveCourse(item.id, course.id)
			}
		}
	}))

	drag(drop(ref))

	return (
		<li
			ref={ref}
			className='flex justify-between gap-1 items-center bg-gray-200 p-2 rounded-lg hover:bg-gray-300'
		>
			{course.title}
			<button
				onClick={() => onRemove(course.id)}
				className='text-red-500'
			>
				&#10005;
			</button>
		</li>
	)
}

interface CourseSelectProps {
	selectedCourses: string[]
	setSelectedCourses: React.Dispatch<React.SetStateAction<string[]>>
}

const CourseSelect: FC<{
	selectedCourses: string[]
	setSelectedCourses: React.Dispatch<React.SetStateAction<string[]>>
}> = ({ selectedCourses, setSelectedCourses }) => {
	const { data: courses, isLoading } = useAllCourses()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const refContainer = useRef<HTMLDivElement>(null)

	const moveCourse = useCallback(
		(dragId: string, hoverId: string) => {
			setSelectedCourses(prev => {
				const dragIndex = prev.indexOf(dragId)
				const hoverIndex = prev.indexOf(hoverId)
				const newCourses = [...prev]
				newCourses.splice(dragIndex, 1)
				newCourses.splice(hoverIndex, 0, dragId)
				return newCourses
			})
		},
		[setSelectedCourses]
	)

	const addCourse = useCallback(
		(courseId: string) => {
			if (!selectedCourses.includes(courseId)) {
				setSelectedCourses(prev => [...prev, courseId])
			}
		},
		[selectedCourses, setSelectedCourses]
	)

	const removeCourse = useCallback(
		(id: string) => {
			setSelectedCourses((prev: string[]) =>
				prev.filter(courseId => courseId !== id)
			)
		},
		[setSelectedCourses]
	)

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			if (
				isFocused &&
				refContainer.current &&
				!refContainer.current.contains(e.target as Node)
			) {
				setIsFocused(false)
			}
		}
		document.addEventListener('mousedown', checkIfClickedOutside)
		return () => {
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [isFocused])

	const filteredCourses = searchTerm
		? courses?.filter(course =>
				course.title.toLowerCase().includes(searchTerm.toLowerCase())
			)
		: courses

	return (
		<div
			className='relative'
			ref={refContainer}
		>
			<Field
				label='Course'
				id='course'
				placeholder='Select a course...'
				extra='mb-6 max-w-[280px] w-[280px]'
				onFocus={() => setIsFocused(true)}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			{isFocused && (
				<ul className='absolute w-full max-h-[300px] overflow-y-scroll top-full mt-2.5 left-0 z-10 bg-white border border-gray-300 rounded-lg p-0 shadow-lg'>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						filteredCourses?.map(course => (
							<li
								key={course.id}
								className='cursor-pointer hover:bg-gray-200 p-2'
								onClick={() => addCourse(course.id)}
							>
								{course.title}
							</li>
						))
					)}
				</ul>
			)}
			<ul className='mt-4 flex items-center gap-2 flex-wrap'>
				{selectedCourses.map(courseId => (
					<CourseItem
						key={courseId}
						course={courses?.find(course => course.id === courseId)!}
						onRemove={removeCourse}
						moveCourse={moveCourse}
					/>
				))}
			</ul>
		</div>
	)
}

export default CourseSelect
