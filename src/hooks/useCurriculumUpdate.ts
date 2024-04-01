import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { UpdateCurriculum } from '@/types/curriculum.types'

import { curriculumService } from '@/services/curriculum.service'

interface UpdateCurriculumArgs {
	data: UpdateCurriculum
	id: string
}

export function useCurriculumUpdate() {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['update curriculum'],
		mutationFn: ({ data, id }: UpdateCurriculumArgs) =>
			curriculumService.updateCurriculum(data, id),
		onSuccess() {
			toast.success('Successfully updated curriculum!')
			queryClient.invalidateQueries({ queryKey: ['curriculum by id'] })
		}
	})

	return { mutate, isPending }
}
