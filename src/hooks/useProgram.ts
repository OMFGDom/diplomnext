import { useQuery } from '@tanstack/react-query'

import { programService } from '@/services/program.service'

export function useProgram() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['program'],
		queryFn: () => programService.getPrograms()
	})

	return { data, isLoading, isSuccess }
}
