import { useQuery } from '@tanstack/react-query'

import { curriculumService } from '@/services/curriculum.service'

export function useCurriculumByProgram(id: string) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['curriculum by program', id],
		queryFn: () => curriculumService.getCurriculumByProgramID(id)
	})

	return { data, isLoading, isSuccess }
}
