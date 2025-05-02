import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from '../../../shared/redux'
import { authApi } from '../api/api'
import { authSlice } from './auth.slice'

export const useUser = () => {
	const userId = useAppSelector(authSlice.selectors.userId)

	return useQuery({
		...authApi.getUserById(userId!),
		enabled: Boolean(userId),
	})
}
