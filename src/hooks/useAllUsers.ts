import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useAllUsers() {
	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['all users'],
		queryFn: () => userService.getAllUsers()
	})

	return { data, isLoading, isSuccess }
}
