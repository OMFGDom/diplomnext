import { useQuery } from '@tanstack/react-query'

import { curriculumService } from '@/services/curriculum.service'

export function useCurriculumMain(id: string, year: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['curriculum', id],
		queryFn: () => curriculumService.getCurriculumMain(id, year)
	})

	return { data, isLoading, isSuccess }
}
