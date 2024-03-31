import { useQuery } from '@tanstack/react-query'

import { coursesService } from '@/services/course.service'

export function useAllCourses() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['all courses'],
		queryFn: () => coursesService.getAllCourses()
	})

	return { data, isLoading, isSuccess }
}
