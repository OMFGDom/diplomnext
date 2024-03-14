import { useQuery } from '@tanstack/react-query'

import { curriculumService } from '@/services/curriculum.service'

export function useCurriculum(id: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['curriculum', id],
		queryFn: () => curriculumService.getCurriculum(id)
	})

	return { data, isLoading, isSuccess }
}
