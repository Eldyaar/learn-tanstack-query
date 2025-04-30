import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { api } from '../../shared/api/axios'

export type PaginatedResult<T> = {
	data: T[]
	first: number
	items: number
	last: number
	next: number | null
	prev: number | null
	pages: number
}

export type TodoDto = {
	id: string
	text: string
	done: boolean
}

export const todoListApi = {
	getTodoList: async (
		{ page }: { page: number },
		{ signal }: { signal: AbortSignal }
	): Promise<PaginatedResult<TodoDto>> => {
		const { data } = await api.get<PaginatedResult<TodoDto>>(
			`/tasks?_page=${page}`,
			{
				signal,
			}
		)
		return data
	},

	getTodoListQueryOptions: ({ page }: { page: number }) => {
		return queryOptions({
			queryKey: ['tasks', 'list', { page }],
			queryFn: meta => todoListApi.getTodoList({ page }, meta),
		})
	},

	getTodoListInfinityQueryOptions: () => {
		return infiniteQueryOptions({
			queryKey: ['tasks', 'list'],
			queryFn: meta => todoListApi.getTodoList({ page: meta.pageParam }, meta),
			initialPageParam: 1,
			getNextPageParam: result => result.next,
			select: result => result.pages.flatMap(page => page.data),
		})
	},
}
