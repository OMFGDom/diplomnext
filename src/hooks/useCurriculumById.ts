import { useQuery } from '@tanstack/react-query'

import { curriculumService } from '@/services/curriculum.service'

export function useCurriculumById(id: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['curriculum by id', id],
		queryFn: () => curriculumService.getCurriculumByID(id)
	})

	return { data, isLoading, isSuccess }
}
