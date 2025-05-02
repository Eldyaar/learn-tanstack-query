import { queryOptions } from '@tanstack/react-query'
import { api } from '../../../shared/api/axios'

export type UserDto = {
	id: string
	login: string
	password: string
}

export const authApi = {
	baseKey: 'users',

	getUserById: (id: string) => {
		return queryOptions({
			queryKey: [authApi.baseKey, 'byId', id],
			queryFn: async meta => {
				const { data } = await api.get<UserDto>(`/users/${id}`, {
					signal: meta.signal,
				})
				console.log('find by id user: ', data)
				return data
			},
		})
	},

	loginUser: async ({
		login,
		password,
	}: {
		login: string
		password: string
	}) => {
		const { data } = await api.get(
			`/users?login=${login}&password=${password}`,
			{}
		)
		console.log('login user: ', data)
		return data[0]
	},
}
