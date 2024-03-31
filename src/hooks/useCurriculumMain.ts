import { useQuery } from '@tanstack/react-query'

import { curriculumService } from '@/services/curriculum.service'

export function useCurriculumMain(id: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['curriculum', id],
		queryFn: () => curriculumService.getCurriculumMain(id)
	})

	return { data, isLoading, isSuccess }
}
