import { useQuery } from '@tanstack/react-query'

import { programService } from '@/services/program.service'

export function useProgram(year: number) {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['program', year],
		queryFn: () => programService.getMainPrograms(year)
	})

	return { data, isLoading, isSuccess }
}
